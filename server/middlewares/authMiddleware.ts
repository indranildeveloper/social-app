import { Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtHandler from "../services/JwtHandler";
import IAuthUserRequest from "../interfaces/AuthUser";
import IJwtPayload from "../interfaces/JwtPayload";

const authMiddleware = asyncHandler(
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
      req.user = user;
      next();
    } catch (error) {
      return next(CustomErrorHandler.unAuthorized());
    }
  }
);

export default authMiddleware;
