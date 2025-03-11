import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Enkel test-route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend fungerar med ES-moduler! 🚀' });
});

// Starta servern
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});