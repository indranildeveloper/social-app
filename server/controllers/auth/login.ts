import { Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import config from "../../config/config";
import User from "../../models/User";
import RefreshToken from "../../models/RefreshToken";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtHandler from "../../services/JwtHandler";
import loginSchema from "../../validators/loginSchema";

const { REFRESH_TOKEN_SECRET } = config;

/**
 * @description   Log In a user
 * @route         POST /api/login
 * @access        Public
 */

const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      // Compare the password
      const passwordMatched: boolean = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatched) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      // Generate Token
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
    } catch (error) {
      return next(error);
    }
  }
);

export default login;
