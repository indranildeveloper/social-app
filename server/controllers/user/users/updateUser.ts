import { Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import config from "../../../config/config";
import User from "../../../models/User";
import RefreshToken from "../../../models/RefreshToken";
import JwtHandler from "../../../services/JwtHandler";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

const { REFRESH_TOKEN_SECRET } = config;

/**
 * @description   Update single user
 * @route         PUT /api/user/:userId
 * @access        Private
 */

const updateUser: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(
        CustomErrorHandler.unAuthorized("You can not update this profile!")
      );
    }

    const { name, email, password } = req.body;
    // Hash the password
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(
      req.user?.password || password,
      salt
    );

    // Update the user
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name,
          email,
          password: hashedPassword,
        },
      },
      {
        new: true,
      }
    );

    if (user) {
      // Generate Tokens
      const generatedAccessToken: string = JwtHandler.generateToken({
        user: user._id.toString(),
      });
      const generatedRefreshToken: string = JwtHandler.generateToken(
        { user: user._id.toString() },
        "1y",
        REFRESH_TOKEN_SECRET
      );

      await RefreshToken.create({
        user: user._id,
        token: generatedRefreshToken,
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken: generatedAccessToken,
        refreshToken: generatedRefreshToken,
      });
    } else {
      return next(CustomErrorHandler.serverError("User can not be updated!"));
    }
  }
);

export default updateUser;
