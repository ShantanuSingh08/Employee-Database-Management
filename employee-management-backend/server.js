const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/EmployeeRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const connectDB = require('./config/database');


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();


// Use routes
app.use('/api', employeeRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
