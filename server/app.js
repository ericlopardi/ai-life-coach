const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { connectToMongoDB } = require("./resource/mongo.js");

const app = express();

// Connect to the database
const mongoDB = connectToMongoDB().then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Log HTTP requests in development mode

// Controller Routes
app.use("/auth", require("./controller/authController.js"));

module.exports = app;
