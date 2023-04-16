import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

/**
 * @description   Delete user profile education
 * @route         DELETE /api/user/:userId/profile/education/:eduId
 * @access        Private
 */

const deleteEducation: RequestHandler = asyncHandler(
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
      const { eduId } = req.params;

      if (profile) {
        const removeIndex = profile.education
          .map((item) => item.id)
          .indexOf(eduId);

        profile.education.splice(removeIndex, 1);

        await profile.save();
      }

      res.status(200).json(profile);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default deleteEducation;
