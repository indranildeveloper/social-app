import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

/**
 * @description   Get user profile
 * @route         GET /api/user/:userId/profile
 * @access        Public
 */

const getProfile: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { userId } = req.params;

    try {
      const profile = await Profile.findOne({ user: userId });
      res.status(200).json(profile);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default getProfile;
