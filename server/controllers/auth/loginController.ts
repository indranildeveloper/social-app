import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import config from "../../config/config";
import User from "../../models/userModel";
import RefreshToken from "../../models/refreshTokenModel";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtHandler from "../../services/JwtHandler";

const { REFRESH_TOKEN_SECRET } = config;

/**
 * @description   Log In a user
 * @route         POST /api/login
 * @access        Public
 */

const loginController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Validate request
    const loginSchema = Joi.object({
      email: Joi.string().email().label("Email").required(),
      password: Joi.string()
        .min(8)
        .pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/)
        .message(
          "Password should contain one uppercase letter, one lowercase letter, one number and one special character!"
        )
        .label("Password")
        .required(),
    });

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

      RefreshToken.create({ token: generatedRefreshToken });
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

export default loginController;
