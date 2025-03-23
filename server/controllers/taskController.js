import Task from '../models/Task.js';

export const createTask = async (req, res, next) => {
  try {
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


