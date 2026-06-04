const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Mongoose v9 no longer requires useNewUrlParser or useUnifiedTopology
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    // Attempt fallback to a local MongoDB instance if provided
    if (process.env.MONGO_URI_LOCAL) {
      try {
        await mongoose.connect(process.env.MONGO_URI_LOCAL);
        console.log("Connected to fallback local MongoDB");
      } catch (fallbackError) {
        console.error("Fallback MongoDB Connection Error:", fallbackError.message);
      }
    }
    // Do not exit the process – keep server running for debugging
  }
};

module.exports = connectDB;