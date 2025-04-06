import Task from '../models/Task.js';
import User from '../models/User.js';

export const createTask = async (req, res, next) => {
  try {
    // TODO: Replace mock user with actual authenticated user from JWT
    req.user = { _id: '6606903ae7f6cc79b25a1234' };


    const { title, description, dueDate, recurring, subtasks } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      recurring,
      subtasks
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};