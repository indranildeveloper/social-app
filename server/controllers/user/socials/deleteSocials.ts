import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

/**
 * @description   Delete user profile socials
 * @route         DELETE /api/user/:userId/profile/socials
 * @access        Private
 */

const deleteSocials: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(
        CustomErrorHandler.unAuthorized(
          "You can not add socials to this profile!"
        )
      );
    }

    try {
      const userProfile = await Profile.findOne({ user: userId });
      const profileId = userProfile?._id;

      const profile = await Profile.findById(profileId);

      if (profile) {
        profile.socialMediaUrls.facebook = "";
        profile.socialMediaUrls.instagram = "";
        profile.socialMediaUrls.github = "";
        profile.socialMediaUrls.linkedIn = "";
        profile.socialMediaUrls.twitter = "";
        profile.socialMediaUrls.youtube = "";

        profile.save();
      }

      res.status(200).json(profile);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default deleteSocials;
