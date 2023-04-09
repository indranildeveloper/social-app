import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import asyncHandler from "express-async-handler";
import config from "../../config/config";
import RefreshToken from "../../models/refreshTokenModel";
import User from "../../models/userModel";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtHandler from "../../services/JwtHandler";
import IJwtPayload from "../../interfaces/JwtPayload";

const { REFRESH_TOKEN_SECRET } = config;

/**
 * @description   Refresh the token
 * @route         POST /api/refresh
 * @access        Private
 */

const refreshTokenController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate request
    const refreshSchema = Joi.object({
      refreshToken: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Check for Refresh Token in database
    let refreshToken;
    try {
      refreshToken = await RefreshToken.findOne({
        token: req.body.refreshToken,
      });
      if (!refreshToken) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token!"));
      }

      // Verify token
      let userId;
      try {
        const { user } = JwtHandler.verifyToken(
          refreshToken.token,
          REFRESH_TOKEN_SECRET
        ) as IJwtPayload;
        userId = user;
      } catch (error) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token!"));
      }

      // Check for user in the database
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(CustomErrorHandler.unAuthorized("No user found!"));
      }

      // Generate tokens
      const generatedAccessToken: string = JwtHandler.generateToken({
        user: user._id.toString(),
      });
      const generatedRefreshToken: string = JwtHandler.generateToken(
        { user: user._id.toString() },
        "1y",
        REFRESH_TOKEN_SECRET
      );

      // Create Refresh Token in database
      await RefreshToken.create({ token: generatedRefreshToken });
      res.json({
        accessToken: generatedAccessToken,
        refreshToken: generatedRefreshToken,
      });
    } catch (error) {
      return next(new Error("Something went wrong"));
    }
  }
);

export default refreshTokenController;
