import mongoose, { Model } from "mongoose";
import IRefreshToken from "../interfaces/RefreshToken";

const { Schema } = mongoose;

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      type: String,
      unique: true,
    },
  },
  { timestamps: false }
);

const RefreshToken: Model<IRefreshToken> = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;
