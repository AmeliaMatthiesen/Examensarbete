import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { EventEmitter } from "events";
import chalk from 'chalk';

// Load env variables
dotenv.config();

// Prevent MaxListeners warning in dev
EventEmitter.defaultMaxListeners = 20;

import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import tasksRoutes from "./routes/taskRoutes.js";
import errorTestRoutes from "./routes/errorTestRoutes.js";
import googleRoutes from "./routes/googleRoutes.js";
import testRoutes from "./routes/testRoutes.js";

import "./cron/recurringTasks.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(express.json());
const allowedOrigins = [ 
  "http://localhost:5173",
  "https://din-vercel-url.vercel.app"
];

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));




// Health check (utan DB)
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "✅ API is running (no DB check)" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(chalk.green("✅ MongoDB connected"));

    // Routes (efter DB-anslutning)
    app.use("/api/auth", authRoutes);
    app.use("/api/tasks", tasksRoutes);
    app.use("/api/error-test", errorTestRoutes);
    app.use("/api/google", googleRoutes);
    app.use("/api/test-tools", testRoutes);

    // Global error handler – måste vara sist
    app.use(errorHandler);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
