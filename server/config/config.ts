import dotenv from "dotenv";
import IConfigType from "../interfaces/Config";

dotenv.config();

const config: IConfigType = {
  PORT: process.env.PORT || "4000",
  NODE_ENV: process.env.NODE_ENV || "development",
  DEBUG_MODE: process.env.DEBUG_MODE || "true",
  JWT_SECRET: process.env.JWT_SECRET || "thisissecret123456",
  REFRESH_TOKEN_SECRET: process.env.JWT_SECRET || "thisissecret123456",
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/social-app",
  PROD_MONGO_URI:
    process.env.PROD_MONGO_URI || "mongodb://127.0.0.1:27017/social-app",
};

export default config;
