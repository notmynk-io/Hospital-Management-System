import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.warn("MONGODB_URI not found. Starting in-memory MongoDB for development/preview...");
      const mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
    }
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    console.warn("Continuing without database connection for now...");
  }
};
