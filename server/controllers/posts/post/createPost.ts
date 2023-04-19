import path from "path";
import Jimp from "jimp";
import { Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import formidable, { Fields, Files, File } from "formidable";
import Post from "../../../models/Post";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";
import generateId from "../../../utils/generateId";

/**
 * @description   Create user post
 * @route         POST /api/user/:userId/post
 * @access        Private
 */

const createPost: RequestHandler = asyncHandler(
  async (req: IAuthUserRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(CustomErrorHandler.unAuthorized("You can not create post!"));
    }

    // Create post
    try {
      const form = formidable({
        keepExtensions: true,
        multiples: false,
      });

      form.parse(req, (err, fields: Fields, files: Files) => {
        if (err) {
          return next(CustomErrorHandler.serverError());
        }

        const file = files.photo as File;
        // Convert the file path to unix friendly filepath
        const oldPath: string = file.filepath.replace(/\\/g, "/");
        const newPath: string = path.join(
          __dirname,
          `../../uploads/post/${userId}-${generateId()}.${
            file.originalFilename?.split(".")[1]
          }`.replace(/\\/g, "/")
        );

        Jimp.read(oldPath, (err, image): void => {
          if (err) {
            return next(
              CustomErrorHandler.serverError("Image manipulation failed!")
            );
          }

          // Compress the image
          image.quality(80);

          // Save the image in file system
          image.write(newPath, (err): void => {
            if (err) {
              return next(
                CustomErrorHandler.serverError("Image upload on disk failed!")
              );
            }
          });
        });

        // Create the post
        const createUserPost: () => Promise<void> = async (): Promise<void> => {
          const { text } = fields;
          const post = await Post.create({
            user: userId,
            text,
            photo: newPath.replace(/\\/g, "/"),
          });

          res.status(201).json(post);
        };

        createUserPost();
      });
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default createPost;
