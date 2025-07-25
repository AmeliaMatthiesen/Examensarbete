import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  type: {
    type: String,
    enum: ['development', 'meeting', 'communication', 'planning'],
    required: true,
  },
  description: {
    type: String,
    default: '',
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  details: {
  type: String,
  default: "",
  maxlength: 1000,
},

time: {
  type: Date,
  default: null,
},

participants: {
  type: String, 
  default: "",
},


  isRecurring: {
    type: Boolean,
    default: false
  },
  recurring: {
    type: String,
    enum: {
      values: ['daily', 'weekly', 'monthly', 'yearly'],
      message: 'recurring must be one of: daily, weekly, monthly, yearly'
    },
    default: null,
    validate: {
      validator: function (v) {
        return !this.isRecurring || v;
      },
      message: 'Recurring type is required when isRecurring is true'
    }
  },
  repeatInterval: {
    type: Number,
    default: null,
    validate: {
      validator: function (v) {
        return !this.isRecurring || (Number.isInteger(v) && v > 0);
      },
      message: 'Repeat interval must be a positive integer when isRecurring is true'
    }
  },
  nextOccurrence: {
    type: Date,
    default: null
  },

  googleEventId: {
    type: String,
    default: null
  },

  subtasks: [subtaskSchema]
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
