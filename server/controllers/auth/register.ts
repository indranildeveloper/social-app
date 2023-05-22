import { Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import config from "../../config/config";
import User from "../../models/User";
import RefreshToken from "../../models/RefreshToken";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtHandler from "../../services/JwtHandler";
import CookieHandler from "../../services/CookieHandler";
import registerSchema from "../../validators/registerSchema";

const { REFRESH_TOKEN_SECRET } = config;

/**
 * @description   Register a user
 * @route         POST /api/register
 * @access        Public
 */

const register: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Check if the user is already exists
    try {
      const userExists = await User.exists({ email: req.body.email });
      if (userExists) {
        return next(CustomErrorHandler.alreadyExists("Email already exists!"));
      }
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server error!"));
    }

    const { name, email, password } = req.body;
    // Hash the password
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    // Create a user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

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

      // Set accessToken and refreshToken in cookie
      CookieHandler.setCookie(res, "accessToken", generatedAccessToken);
      CookieHandler.setCookie(res, "refreshToken", generatedRefreshToken);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken: generatedAccessToken,
        refreshToken: generatedRefreshToken,
      });
    } else {
      return next(CustomErrorHandler.serverError("User can not be created!"));
    }
  }
);

export default register;
