const mongoose = require('mongoose');

const connectToMongoDB = () => {
    return mongoose
      .connect(process.env.MONGO_URI)
      .catch((err) => {
        return Promise.reject(err);
      });
} 

module.exports = { connectToMongoDB };