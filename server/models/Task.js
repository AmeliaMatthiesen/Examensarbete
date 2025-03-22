const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: String,
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    },
    dueDate: Date
});

module.exports = mongoose.model("Task", TaskSchema);