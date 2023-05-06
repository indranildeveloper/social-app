import { Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../../../models/Post";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

/**
 * @description   Delete comment user post
 * @route         PUT /api/post/:postId/uncomment
 * @access        Private
 */

const deleteComment: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?._id;

    if (userId?.toString() !== req.body.userId) {
      return next(
        CustomErrorHandler.unAuthorized("You can not delete the post comment!")
      );
    }

    try {
      const commentedPost = await Post.findByIdAndUpdate(
        {
          _id: req.params.postId,
        },
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
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

export default deleteComment;
