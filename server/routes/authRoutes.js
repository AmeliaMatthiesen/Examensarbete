import express from 'express';
import { register, login } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.get('/verify', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Token is valid', user: req.user });
});

export default router;
