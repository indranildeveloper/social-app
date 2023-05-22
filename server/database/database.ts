import mongoose from "mongoose";
import config from "../config/config";

const { NODE_ENV, MONGO_URI, PROD_MONGO_URI } = config;

const mongodbUri = NODE_ENV === "development" ? MONGO_URI : PROD_MONGO_URI;

const connectDatabase: () => Promise<void> = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(mongodbUri);
    console.log(
      `Mongodb Connected: ${conn.connections[0].host}`.cyan.underline
    );
  } catch (error) {
    console.error(`Error: ${error}`.red.underline);
    process.exit(1);
  }
};

export default connectDatabase;
