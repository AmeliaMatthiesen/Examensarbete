import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/sync', (req, res) => {
  throw new Error(' Simulated sync error');
});

router.get('/async', asyncHandler(async (req, res) => {
  await Promise.reject(new Error(' Simulated async error'));
}));

router.get('/notfound', (req, res, next) => {
  const error = new Error('Simulated 404 error');
  error.statusCode = 404;
  next(error);
});

export default router;
