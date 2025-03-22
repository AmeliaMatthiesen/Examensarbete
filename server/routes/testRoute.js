const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/test', async (req, res) => {
  try {
    const dummyTask = new Task({
      title: 'Dummy Task',
      status: 'todo',
      dueDate: new Date()
    });

    const savedTask = await dummyTask.save();
    res.status(201).json({ message: 'Task created!', task: savedTask });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err });
  }
});

module.exports = router;
