import { Request } from "express";
import { Document, Types } from "mongoose";
import IUser from "./User";

interface IAuthUserRequest extends Request {
  user?:
    | (Document<unknown, object, IUser> &
        Omit<
          IUser & {
            _id: Types.ObjectId;
          },
          never
        >)
    | null;
}

export default IAuthUserRequest;
