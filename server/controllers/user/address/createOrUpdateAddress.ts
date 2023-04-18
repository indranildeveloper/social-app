import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";
import addressSchema from "../../../validators/addressSchema";

/**
 * @description   Create or update user profile address
 * @route         POST or PUT /api/user/:userId/profile/address
 * @access        Private
 */

const createOrUpdateAddress: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { error } = addressSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(
        CustomErrorHandler.unAuthorized(
          "You can not add address to this profile!"
        )
      );
    }

    try {
      const userProfile = await Profile.findOne({ user: userId });
      const profileId = userProfile?._id;

      const profile = await Profile.findById(profileId);

      const { country, state, zip } = req.body;

      if (profile) {
        profile.address.country = country;
        profile.address.state = state;
        profile.address.zip = zip;

        await profile.save();
      }

      res.status(200).json(profile);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default createOrUpdateAddress;
