import { Request } from "express";

interface IAuthUserRequest extends Request {
  user?: string;
}

export default IAuthUserRequest;
