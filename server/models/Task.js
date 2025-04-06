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
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },

 // Recurring logic
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
  default: null
},
// TODO: Add logic to auto-generate nextOccurrence based on recurring pattern
nextOccurrence: {
  type: Date,
  default: null
},

subtasks: [subtaskSchema]

}, {
timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
