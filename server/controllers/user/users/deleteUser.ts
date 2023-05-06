import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import User from "../../../models/User";
import RefreshToken from "../../../models/RefreshToken";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

/**
 * @description   Delete single user
 * @route         DELETE /api/user/:userId
 * @access        Private
 */

const deleteUser: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(
        CustomErrorHandler.unAuthorized("You can not delete this profile!")
      );
    }

    try {
      const user = await User.deleteOne({
        _id: userId,
      }).select("-password -createdAt -updatedAt -__v");

      await RefreshToken.deleteMany({ user: req.user?._id });

      res.status(200).json({
        message: "User is successfully deleted!",
      });

      if (!user) {
        return next(CustomErrorHandler.notFound());
      }

      res.status(202).json(user);
    } catch (error) {
      return next(error);
    }
  }
);

export default deleteUser;
