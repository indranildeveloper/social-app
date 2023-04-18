import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../../../models/Post";
import CustomErrorHandler from "../../../services/CustomErrorHandler";

/**
 * @description   Unlike user post
 * @route         Post /api/post/:postId/unlike
 * @access        Private
 */

const deleteLike: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get posts
    try {
      const post = await Post.findByIdAndUpdate(
        {
          _id: req.params.postId,
        },
        {
          $pull: {
            likes: req.body.userId,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(post);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default deleteLike;
