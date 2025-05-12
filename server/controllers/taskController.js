import Task from '../models/Task.js';
import User from '../models/User.js';
import { calculateNextOccurrence } from '../utils/calculateNextOccurrence.js';
import { createCalendarEvent } from '../services/googleService.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      type,
      time,
      participants,
      details,
      isRecurring,
      recurring,
      repeatInterval,
      subtasks,
    } = req.body;

    console.log(" Incoming task:", req.body);

    const nextOccurrence =
      isRecurring && time
        ? calculateNextOccurrence(time, recurring, repeatInterval)
        : null;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
      type,
      time,
      participants,
      details,
      isRecurring,
      recurring,
      repeatInterval,
      nextOccurrence,
      subtasks,
    });

    const user = await User.findById(req.user._id);

    if (user.googleTokens) {
      try {
        const eventId = await createCalendarEvent(user.googleTokens, task);
        task.googleEventId = eventId;
        await task.save();
      } catch (calendarErr) {
        console.warn('⚠️ Calendar sync failed:', calendarErr.message);
      }
    }

    res.status(201).json(task);
  } catch (err) {
    console.error(" Task creation failed:", err);
    next(err);
  }
};

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
