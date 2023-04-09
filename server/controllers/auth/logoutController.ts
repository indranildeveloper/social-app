import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import asyncHandler from "express-async-handler";
import RefreshToken from "../../models/refreshTokenModel";

const logoutController: RequestHandler = asyncHandler(
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

export default logoutController;
