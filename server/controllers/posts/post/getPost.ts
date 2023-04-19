import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../../../models/Post";
import CustomErrorHandler from "../../../services/CustomErrorHandler";

/**
 * @description   GET user post
 * @route         GET /api/post/:postId
 * @access        Private
 */

const getPost: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get posts
    try {
      const post = await Post.findById({ _id: req.params.postId });
      res.status(200).json(post);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default getPost;
