import mongoose from "mongoose";
import config from "../config/config";

const { MONGO_URI } = config;

const connectDatabase: () => Promise<void> = async (): Promise<void> => {
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

export default connectDatabase;
