import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import User from "../../../models/User";
import CustomErrorHandler from "../../../services/CustomErrorHandler";

/**
 * @description   Get all users
 * @route         GET /api/users
 * @access        Private
 */

const getUsers: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.find().select(
        "-password -createdAt -updatedAt -__v"
      );
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }

      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
);

export default getUsers;
