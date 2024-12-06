// Import necessary modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Connect to MongoDB using URI from .env file
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

mongoose.connection.on('open', () => {
    console.log('MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

// Use CORS (allows requests from your frontend) and express.json() middleware
app.use(cors());
app.use(express.json());

// User routes
app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes); // Mount the order routes at '/api/orders'





// Test route
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Define the port the server will run on
const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
