import mongoose from "mongoose";

export async function connect() {
  try {
    console.log("URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Connection failed:");
    console.log(error);
  }
}