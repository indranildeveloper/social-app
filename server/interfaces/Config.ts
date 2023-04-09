interface IConfigType {
  PORT: string;
  NODE_ENV: string;
  DEBUG_MODE: string;
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  MONGO_URI: string;
  PROD_MONGO_URI: string;
}

export default IConfigType;
