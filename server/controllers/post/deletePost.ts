import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../../models/Post";
import CustomErrorHandler from "../../services/CustomErrorHandler";

/**
 * @description   GET user posts
 * @route         DELETE /api/user/:userId/post/:postId
 * @access        Private
 */

const deletePost: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get posts
    try {
      const post = await Post.findByIdAndDelete({ _id: req.params.postId });
      res.status(202).json(post);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default deletePost;
