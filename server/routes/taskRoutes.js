import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncHandler(getTasks));
router.post("/", asyncHandler(createTask));
router.put("/:id", asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

export default router;
