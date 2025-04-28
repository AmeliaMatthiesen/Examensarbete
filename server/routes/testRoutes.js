import express from 'express';
import Task from '../models/Task.js';
import authMiddleware from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

// Create a dummy task for the authenticated user
router.post('/test', authMiddleware, asyncHandler(async (req, res) => {
  const dummyTask = new Task({
    user: req.user._id,
    title: 'Dummy Task',
    status: 'todo',
    dueDate: new Date(),
    isRecurring: false
  });

  const savedTask = await dummyTask.save();

  res.status(201).json({
    message: '✅ Dummy task created!',
    task: savedTask
  });
}));

export default router;
