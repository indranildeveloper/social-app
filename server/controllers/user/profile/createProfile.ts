import path from "path";
import Jimp from "jimp";
import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import formidable, { Fields, Files, File } from "formidable";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";

/**
 * @description   Create user profile
 * @route         POST /api/user/:userId/profile
 * @access        Private
 */

const createProfile: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(
        CustomErrorHandler.unAuthorized("You can not create profile!")
      );
    }

    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return next(
        CustomErrorHandler.unAuthorized(
          "You already have a profile and you can not create multiple profiles!"
        )
      );
    }

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
          `../../../uploads/profile/${userId}.${
            file.originalFilename?.split(".")[1]
          }`.replace(/\\/g, "/")
        );

        Jimp.read(oldPath, (err, image): void => {
          if (err) {
            return next(
              CustomErrorHandler.serverError("Image manipulation failed!")
            );
          }

          // Resize the image
          image.resize(400, 400);
          // Compress the image
          image.quality(80);

          // Save the image to file system
          image.write(newPath, (err): void => {
            if (err) {
              return next(
                CustomErrorHandler.serverError("Image upload on disk failed!")
              );
            }
          });
        });

        // Create the profile
        const createUserProfile: () => Promise<void> =
          async (): Promise<void> => {
            const { about, phoneNumber, website } = fields;

            const profile = await Profile.create({
              user: userId,
              about,
              phoneNumber,
              website,
              photo: newPath.replace(/\\/g, "/"),
            });

            res.status(201).json(profile);
          };

        createUserProfile();
      });
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default createProfile;
