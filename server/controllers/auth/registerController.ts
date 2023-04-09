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
 * @description   Register a user
 * @route         POST /api/register
 * @access        Public
 */

const registerController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).label("Name").required(),
      email: Joi.string().email().label("Email").required(),
      // Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters,
      // one numeric and one special character
      password: Joi.string()
        .min(8)
        .pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/)
        .message(
          "Password should contain one uppercase letter, one lowercase letter, one number and one special character!"
        )
        .label("Password")
        .required(),
      confirmPassword: Joi.ref("password"),
    });

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

      RefreshToken.create({ token: generatedRefreshToken });

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

export default registerController;
