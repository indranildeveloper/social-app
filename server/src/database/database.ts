import mongoose from "mongoose";
import config from "../config/config";

const { MONGO_URI } = config;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(
      `Mongodb Connected: ${conn.connections[0].host}`.cyan.underline
    );
  } catch (error) {
    console.error(`Error: ${error}`.red.underline);
    process.exit(1);
  }
};

export default connectDB;
