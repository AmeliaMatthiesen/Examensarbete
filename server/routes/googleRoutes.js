import express from 'express';
import { getAuthUrl, getTokens } from '../services/googleService.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Redirect user to Google login
router.get('/auth/google', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

// Handle OAuth callback from Google and link tokens to logged-in user
router.get('/auth/google/callback', authMiddleware, async (req, res) => {
  try {
    const { code } = req.query;
    const tokens = await getTokens(code);

    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { googleTokens: tokens });

    res.send('✅ Google authentication successful! You can close this window.');
  } catch (error) {
    console.error('❌ Error during Google authentication:', error);
    res.status(500).send('Error during Google authentication');
  }
});

export default router;
