const Calendar = require('../models/Calendar');
const { validationResult } = require('express-validator');

/**
 * Get all calendar events for the authenticated user
 * GET /api/calendar/events
 */
const getUserCalendarEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const { start, end } = req.query;
    
    console.log(`[CALENDAR] Getting events for user: ${req.user.username} (${userId})`);
    
    let events;
    if (start && end) {
      // Get events within date range
      const startDate = new Date(start);
      const endDate = new Date(end);
      events = await Calendar.getEventsForUser(userId, startDate, endDate);
      console.log(`[CALENDAR] Found ${events.length} events between ${start} and ${end}`);
    } else {
      // Get all active events for user
      events = await Calendar.find({ 
        userId, 
        isActive: true 
      }).sort({ start: 1 });
      console.log(`[CALENDAR] Found ${events.length} total events for user`);
    }
    
    // Transform events for frontend
    const formattedEvents = events.map(event => event.toFrontend());
    
    res.json({
      success: true,
      data: formattedEvents,
      message: `Retrieved ${formattedEvents.length} calendar events`
    });
  } catch (error) {
    console.error('[CALENDAR] Error getting user events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve calendar events',
      error: error.message
    });
  }
};

/**
 * Create a new calendar event
 * POST /api/calendar/events
 */
const createCalendarEvent = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const userId = req.user.id;
    const { title, description, start, end, allDay, color } = req.body;
    
    console.log(`[CALENDAR] Creating event for user: ${req.user.username} - "${title}"`);
    
    // Create new calendar event
    const newEvent = new Calendar({
      title,
      description,
      start: new Date(start),
      end: new Date(end),
      allDay: allDay || false,
      color: color || '#1976d2',
      userId,
      createdBy: userId
    });
    
    const savedEvent = await newEvent.save();
    console.log(`[CALENDAR] Event created with ID: ${savedEvent._id}`);
    
    res.status(201).json({
      success: true,
      data: savedEvent.toFrontend(),
      message: 'Calendar event created successfully'
    });
  } catch (error) {
    console.error('[CALENDAR] Error creating event:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create calendar event',
      error: error.message
    });
  }
};

/**
 * Update an existing calendar event
 * PUT /api/calendar/events/:id
 */
const updateCalendarEvent = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const userId = req.user.id;
    const eventId = req.params.id;
    const { title, description, start, end, allDay, color } = req.body;
    
    console.log(`[CALENDAR] Updating event ${eventId} for user: ${req.user.username}`);
    
    // Find the event and verify ownership
    const event = await Calendar.findOne({ 
      _id: eventId, 
      userId, 
      isActive: true 
    });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Calendar event not found or access denied'
      });
    }
    
    // Update event fields
    event.title = title || event.title;
    event.description = description !== undefined ? description : event.description;
    event.start = start ? new Date(start) : event.start;
    event.end = end ? new Date(end) : event.end;
    event.allDay = allDay !== undefined ? allDay : event.allDay;
    event.color = color || event.color;
    event.updatedBy = userId;
    
    const updatedEvent = await event.save();
    console.log(`[CALENDAR] Event ${eventId} updated successfully`);
    
    res.json({
      success: true,
      data: updatedEvent.toFrontend(),
      message: 'Calendar event updated successfully'
    });
  } catch (error) {
    console.error('[CALENDAR] Error updating event:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update calendar event',
      error: error.message
    });
  }
};

/**
 * Delete a calendar event (soft delete)
 * DELETE /api/calendar/events/:id
 */
const deleteCalendarEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    
    console.log(`[CALENDAR] Deleting event ${eventId} for user: ${req.user.username}`);
    
    // Find the event and verify ownership
    const event = await Calendar.findOne({ 
      _id: eventId, 
      userId, 
      isActive: true 
    });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Calendar event not found or access denied'
      });
    }
    
    // Soft delete - mark as inactive
    event.isActive = false;
    event.updatedBy = userId;
    await event.save();
    
    console.log(`[CALENDAR] Event ${eventId} deleted successfully`);
    
    res.json({
      success: true,
      message: 'Calendar event deleted successfully'
    });
  } catch (error) {
    console.error('[CALENDAR] Error deleting event:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete calendar event',
      error: error.message
    });
  }
};

/**
 * Get calendar statistics for the user
 * GET /api/calendar/stats
 */
const getCalendarStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log(`[CALENDAR] Getting stats for user: ${req.user.username}`);
    
    const stats = await Calendar.aggregate([
      { $match: { userId: userId, isActive: true } },
      {
        $group: {
          _id: null,
          totalEvents: { $sum: 1 },
          upcomingEvents: {
            $sum: {
              $cond: [{ $gte: ['$start', new Date()] }, 1, 0]
            }
          },
          pastEvents: {
            $sum: {
              $cond: [{ $lt: ['$end', new Date()] }, 1, 0]
            }
          },
          allDayEvents: {
            $sum: {
              $cond: ['$allDay', 1, 0]
            }
          }
        }
      }
    ]);
    
    const result = stats[0] || {
      totalEvents: 0,
      upcomingEvents: 0,
      pastEvents: 0,
      allDayEvents: 0
    };
    
    res.json({
      success: true,
      data: result,
      message: 'Calendar statistics retrieved successfully'
    });
  } catch (error) {
    console.error('[CALENDAR] Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve calendar statistics',
      error: error.message
    });
  }
};

module.exports = {
  getUserCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getCalendarStats
};
