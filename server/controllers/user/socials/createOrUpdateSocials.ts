import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

/**
 * @description   Create or update user profile socials
 * @route         POST or PUT /api/user/:userId/profile/socials
 * @access        Private
 */

const createOrUpdateSocials: RequestHandler = asyncHandler(
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

      const { facebook, instagram, github, linkedIn, twitter, youtube } =
        req.body;

      if (profile) {
        profile.socialMediaUrls.facebook = facebook;
        profile.socialMediaUrls.instagram = instagram;
        profile.socialMediaUrls.github = github;
        profile.socialMediaUrls.linkedIn = linkedIn;
        profile.socialMediaUrls.twitter = twitter;
        profile.socialMediaUrls.youtube = youtube;

        await profile.save();
      }

      res.status(200).json(profile);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default createOrUpdateSocials;
