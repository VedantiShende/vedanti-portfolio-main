const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  allDay: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    trim: true,
    maxlength: 7, // For hex colors like #ff0000
    default: '#1976d2'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // Index for faster queries by user
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // For recurring events (future enhancement)
  recurrence: {
    type: {
      frequency: {
        type: String,
        enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
        default: 'none'
      },
      interval: {
        type: Number,
        default: 1
      },
      endDate: Date,
      count: Number
    },
    default: null
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
calendarEventSchema.index({ userId: 1, start: 1 });
calendarEventSchema.index({ userId: 1, end: 1 });
calendarEventSchema.index({ userId: 1, createdAt: -1 });

// Validation: end date should be after start date
calendarEventSchema.pre('save', function(next) {
  if (this.end <= this.start) {
    const error = new Error('End date must be after start date');
    error.name = 'ValidationError';
    return next(error);
  }
  next();
});

// Virtual for duration in minutes
calendarEventSchema.virtual('duration').get(function() {
  return Math.round((this.end - this.start) / (1000 * 60)); // Duration in minutes
});

// Static method to get events for a user within a date range
calendarEventSchema.statics.getEventsForUser = function(userId, startDate, endDate) {
  const query = {
    userId,
    isActive: true,
    $or: [
      // Events that start within the range
      { start: { $gte: startDate, $lte: endDate } },
      // Events that end within the range
      { end: { $gte: startDate, $lte: endDate } },
      // Events that span the entire range
      { start: { $lte: startDate }, end: { $gte: endDate } }
    ]
  };
  
  return this.find(query).sort({ start: 1 });
};

// Instance method to check if user owns this event
calendarEventSchema.methods.isOwnedBy = function(userId) {
  return this.userId.toString() === userId.toString();
};

// Transform function to format output for frontend
calendarEventSchema.methods.toFrontend = function() {
  return {
    id: this._id.toString(),
    title: this.title,
    description: this.description,
    start: this.start.toISOString(),
    end: this.end.toISOString(),
    allDay: this.allDay,
    color: this.color,
    userId: this.userId.toString(),
    createdAt: this.createdAt.toISOString(),
    updatedAt: this.updatedAt.toISOString()
  };
};

const Calendar = mongoose.model('Calendar', calendarEventSchema);

module.exports = Calendar;
