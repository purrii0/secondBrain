import mongoose from "mongoose";
import { ENV } from "../config";

const connecttoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default connecttoDB;
