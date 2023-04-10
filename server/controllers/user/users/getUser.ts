import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import User from "../../../models/User";
import CustomErrorHandler from "../../../services/CustomErrorHandler";

/**
 * @description   Get single user
 * @route         GET /api/user/:userId
 * @access        Private
 */

const getUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
      const user = await User.findOne({
        _id: userId,
      }).select("-password -createdAt -updatedAt -__v");
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }

      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
);

export default getUser;
