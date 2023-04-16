import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";
import generateId from "../../../utils/generateId";

/**
 * @description   Create user profile education
 * @route         POST /api/user/:userId/profile/education
 * @access        Private
 */

const createEducation: RequestHandler = asyncHandler(
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
      const profile = await Profile.findOne({ user: userId });

      const { institute, from, to, isPresent, degree, description } = req.body;

      const newEducation = {
        id: generateId(),
        institute,
        from,
        to,
        isPresent,
        degree,
        description,
      };

      if (profile) {
        profile.education.unshift(newEducation);
        await profile.save();
      }

      res.status(200).json(profile);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default createEducation;
