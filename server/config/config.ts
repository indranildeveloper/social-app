import dotenv from "dotenv";
import { ConfigType } from "../interfaces/Config";

dotenv.config();

const config: ConfigType = {
  PORT: process.env.PORT || "4000",
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/social-app",
  PROD_MONGO_URI:
    process.env.PROD_MONGO_URI || "mongodb://127.0.0.1:27017/social-app",
};

export default config;
