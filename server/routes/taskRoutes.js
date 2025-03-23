import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { createTask } from "../controllers/taskController.js";
import mockAuth from "../middleware/authMiddleware.js";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", mockAuth, asyncHandler(createTask));

router.get("/", asyncHandler(async (res) => {
  const tasks = await Task.find();
  res.json(tasks);
}));

export default router;