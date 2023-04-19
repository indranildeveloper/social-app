import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../../../models/Post";
import CustomErrorHandler from "../../../services/CustomErrorHandler";

/**
 * @description   GET user posts
 * @route         GET /api/post
 * @access        Private
 */

const getPosts: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get posts
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default getPosts;
