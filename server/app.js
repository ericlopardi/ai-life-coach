const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Connect to the database

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log HTTP requests in development mode

// Routes


module.exports = app;