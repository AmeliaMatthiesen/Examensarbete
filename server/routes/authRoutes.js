import express from 'express';
import { register } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask } from "../controllers/taskController.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/', authMiddleware, createTask);



export default router;