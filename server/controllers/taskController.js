import Task from '../models/Task.js';
import User from '../models/User.js';
import { calculateNextOccurrence } from '../utils/calculateNextOccurrence.js';
import { createCalendarEvent } from '../services/googleService.js';

// GET /api/tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      dueDate,
      status,
      isRecurring,
      recurring,
      repeatInterval,
      subtasks,
    } = req.body;

    const nextOccurrence =
      isRecurring && dueDate
        ? calculateNextOccurrence(dueDate, recurring, repeatInterval)
        : null;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      status,
      isRecurring,
      recurring,
      repeatInterval,
      nextOccurrence,
      subtasks,
    });

    const user = await User.findById(req.user._id);

    // Om Google-tokens finns, synca med kalender
    if (user.googleTokens) {
      try {
        const eventId = await createCalendarEvent(user.googleTokens, task);
        task.googleEventId = eventId;
        await task.save();
      } catch (calendarErr) {
        console.warn('⚠️ Calendar sync failed:', calendarErr.message);
        // Kör vidare ändå – upp till dig om du vill informera klienten
      }
    }

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      const error = new Error('Task not found or not authorized');
      error.statusCode = 404;
      throw error;
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      const error = new Error('Task not found or not authorized');
      error.statusCode = 404;
      throw error;
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
