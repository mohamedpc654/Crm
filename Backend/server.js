// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/admin', require('./routes/admin')); // Admin routes (to be implemented)
app.use('/api/manager', require('./routes/manager')); // Manager routes
app.use('/api/employee', require('./routes/employee')); // Employee routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});