import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtHandler from "../services/JwtHandler";
import IAuthUserRequest from "../interfaces/AuthUser";
import IJwtPayload from "../interfaces/JwtPayload";

const auth: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(CustomErrorHandler.unAuthorized());
    }
    const token: string = authHeader.split(" ")[1];
    try {
      const { user } = JwtHandler.verifyToken(token) as IJwtPayload;
      const loggedInUser = await User.findOne({ _id: user });
      req.user = loggedInUser;
      console.log(req.user);
      next();
    } catch (error) {
      return next(CustomErrorHandler.unAuthorized());
    }
  }
);

export default auth;
