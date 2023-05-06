import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";
import generateId from "../../../utils/generateId";
import experienceSchema from "../../../validators/experienceSchema";

/**
 * @description   Create user profile experience
 * @route         POST /api/user/:userId/profile/experience
 * @access        Private
 */

const createExperience: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { error } = experienceSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(
        CustomErrorHandler.unAuthorized(
          "You can not add socials to this profile!"
        )
      );
    }

    try {
      const profile = await Profile.findOne({ user: userId });

      const { company, from, to, isPresent, position, description } = req.body;

      const newExperience = {
        id: generateId(),
        company,
        from,
        to,
        isPresent,
        position,
        description,
      };

      if (profile) {
        profile.experience.unshift(newExperience);
        await profile.save();
      }

      res.status(200).json(profile);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default createExperience;
