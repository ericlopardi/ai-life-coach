const mongoose = require('mongoose');

const connectToMongoDB = () => {
    return mongoose
      .connect(process.env.MONGO_URI)
      .catch((err) => {
        console.error("Error occured attempting database connection", err);
        process.exit(1);
      });
} 

module.exports = { connectToMongoDB };