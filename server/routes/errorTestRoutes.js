import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

// Simulated sync error
router.get('/sync', (req, res) => {
  throw new Error('🔥 Simulated sync error');
});

// Simulated async error
router.get('/async', asyncHandler(async (req, res) => {
  await Promise.reject(new Error('💣 Simulated async error'));
}));

export default router;
