import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

/**
 * @description   Delete user profile
 * @route         DELETE /api/user/:userId/profile
 * @access        Public
 */

const deleteProfile: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(
        CustomErrorHandler.unAuthorized("You can not delete profile!")
      );
    }

    try {
      const userProfile = await Profile.findOne({ user: userId });
      const profileId = userProfile?._id;

      const profile = await Profile.findByIdAndDelete({ _id: profileId });
      res.status(200).json(profile);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default deleteProfile;
