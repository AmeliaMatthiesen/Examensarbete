import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import asyncHandler from "./middleware/asyncHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import errorTestRoutes from "./routes/errorTestRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected...'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Test-route
app.get("/api/test", (req, res) => {
    res.json({ message: "API works!" });
});

app.use('/api/error-test', errorTestRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
