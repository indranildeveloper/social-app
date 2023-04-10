import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import asyncHandler from "express-async-handler";
import RefreshToken from "../../models/RefreshToken";

/**
 * @description   Log out user
 * @route         POST /api/logout
 * @access        Private
 */

const logout: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Validate Request
    const userSchema = Joi.object({
      userId: Joi.string().required().label("User Id"),
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      await RefreshToken.deleteMany({ user: req.body.userId });
    } catch (error) {
      return next(new Error("Something went wrong in database!"));
    }

    res.status(202).json({ message: "User deleted!" });
  }
);

export default logout;
