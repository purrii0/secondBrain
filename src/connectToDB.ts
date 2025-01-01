import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI as string;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined");
}

const connecttoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default connecttoDB;
