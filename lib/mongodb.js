// lib/mongodb.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

let isConnected = false; // Track connection status

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "password-manager", // change name if needed
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error);
  }
};
