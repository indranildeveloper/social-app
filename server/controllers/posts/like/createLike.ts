import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../../../models/Post";
import CustomErrorHandler from "../../../services/CustomErrorHandler";

/**
 * @description   Like user post
 * @route         PUT /api/post/:postId/like
 * @access        Private
 */

const createLike: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post = await Post.findById({ _id: req.params.postId });

      const alreadyLiked = post?.likes.find(
        (element) => element.toString() === req.body.userId
      );

      if (alreadyLiked) {
        res.status(200).json({
          message: "You have already liked the post!",
        });
      }

      const likedPost = await Post.findByIdAndUpdate(
        {
          _id: req.params.postId,
        },
        {
          $push: {
            likes: req.body.userId,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(likedPost);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default createLike;
