import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../../../models/Post";
import CustomErrorHandler from "../../../services/CustomErrorHandler";

/**
 * @description   Create comment user post
 * @route         PUT /api/post/:postId/comment
 * @access        Private
 */

const createComment: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const commentedPost = await Post.findByIdAndUpdate(
        {
          _id: req.params.postId,
        },
        {
          $push: {
            comments: [
              {
                text: req.body.text,
                user: req.body.user,
              },
            ],
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(commentedPost);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default createComment;
