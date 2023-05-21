import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import config from "../../config/config";
import RefreshToken from "../../models/RefreshToken";
import User from "../../models/User";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtHandler from "../../services/JwtHandler";
import IJwtPayload from "../../interfaces/JwtPayload";
import refreshSchema from "../../validators/refreshSchema";

const { REFRESH_TOKEN_SECRET } = config;

/**
 * @description   Refresh the token
 * @route         POST /api/refresh
 * @access        Private
 */

const refresh: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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

      // Delete existing Refresh Token in Database
      await RefreshToken.deleteMany({
        user: user._id,
      });

      // Create Refresh Token in database
      await RefreshToken.create({
        user: user._id,
        token: generatedRefreshToken,
      });

      // Set token in cookie
      // --->

      res.json({
        accessToken: generatedAccessToken,
        refreshToken: generatedRefreshToken,
      });
    } catch (error) {
      return next(new Error("Something went wrong!"));
    }
  }
);

export default refresh;
