require("dotenv").config();
const mongoose = require("mongoose");

let isConnected = false; // track connection state

exports.connectToDB = async () => {
  if (isConnected) {
    // Reuse existing connection in serverless environments
    console.log("♻️ Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // helps with serverless scaling
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};
