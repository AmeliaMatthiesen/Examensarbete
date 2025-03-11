require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.arguments(express.json());
app.use(cors());

// Enkel test-route
app.get('/', (req, res) => {
    res.send('API is running...');
});

//Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});