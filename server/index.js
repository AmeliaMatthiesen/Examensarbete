import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Viktigt för att hantera JSON-data!
app.use(cors());

// Test-route
app.get("/api/test", (req, res) => {
    res.json({ message: "API works!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
