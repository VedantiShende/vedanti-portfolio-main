const express = require('express');
const { body, param, query } = require('express-validator');
const {
  getUserCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getCalendarStats
} = require('../controllers/calendarController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication to all calendar routes
router.use(authenticateToken);

// Validation rules
const createEventValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be between 1-200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('start')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  body('end')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.start)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('allDay')
    .optional()
    .isBoolean()
    .withMessage('allDay must be a boolean value'),
  body('color')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color must be a valid hex color (e.g., #ff0000)')
];

const updateEventValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid event ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1-200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('start')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  body('end')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),
  body('allDay')
    .optional()
    .isBoolean()
    .withMessage('allDay must be a boolean value'),
  body('color')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color must be a valid hex color (e.g., #ff0000)')
];

const deleteEventValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid event ID')
];

const getEventsValidation = [
  query('start')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  query('end')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
];

/**
 * @route   GET /api/calendar/events
 * @desc    Get all calendar events for authenticated user
 * @access  Private
 */
router.get('/events', getEventsValidation, getUserCalendarEvents);

/**
 * @route   POST /api/calendar/events
 * @desc    Create a new calendar event
 * @access  Private
 */
router.post('/events', createEventValidation, createCalendarEvent);

/**
 * @route   PUT /api/calendar/events/:id
 * @desc    Update a calendar event
 * @access  Private (owner only)
 */
router.put('/events/:id', updateEventValidation, updateCalendarEvent);

/**
 * @route   DELETE /api/calendar/events/:id
 * @desc    Delete a calendar event
 * @access  Private (owner only)
 */
router.delete('/events/:id', deleteEventValidation, deleteCalendarEvent);

/**
 * @route   GET /api/calendar/stats
 * @desc    Get calendar statistics for authenticated user
 * @access  Private
 */
router.get('/stats', getCalendarStats);

module.exports = router;
