import { Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../../models/Post";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import IAuthUserRequest from "../../interfaces/AuthUser";

/**
 * @description   GET user posts
 * @route         DELETE /api/user/:userId/post/:postId
 * @access        Private
 */

const deletePost: RequestHandler = asyncHandler(
  async (req: IAuthUserRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(CustomErrorHandler.unAuthorized("You can not create post!"));
    }

    // Delete posts
    try {
      const post = await Post.findByIdAndDelete({ _id: req.params.postId });
      res.status(202).json(post);
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default deletePost;
