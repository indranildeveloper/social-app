import { ObjectId } from "mongoose";

interface IRefreshToken {
  user: ObjectId;
  token: string;
}

export default IRefreshToken;
