import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import RefreshToken from "../../models/RefreshToken";
import logoutSchema from "../../validators/logoutSchema";

/**
 * @description   Log out user
 * @route         POST /api/logout
 * @access        Private
 */

const logout: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error } = logoutSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      await RefreshToken.deleteMany({ user: req.body.userId });
    } catch (error) {
      return next(new Error("Something went wrong in database!"));
    }

    res.status(202).json({ message: "User logged out!" });
  }
);

export default logout;
