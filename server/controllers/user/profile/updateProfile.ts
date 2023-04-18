import path from "path";
import Jimp from "jimp";
import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import formidable, { Fields, Files, File } from "formidable";
import Profile from "../../../models/Profile";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import IAuthUserRequest from "../../../interfaces/AuthUser";
import profileSchema from "../../../validators/profileSchema";

/**
 * @description   Update user profile
 * @route         PUT /api/user/:userId/profile
 * @access        Private
 */

const updateProfile: RequestHandler = asyncHandler(
  async (
    req: IAuthUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { error } = profileSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const userId = req.user?._id;

    if (userId?.toString() !== req.params.userId) {
      return next(
        CustomErrorHandler.unAuthorized("You can not create profile!")
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
          `../../../uploads/${userId}.${
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
        const updateProfile: () => Promise<void> = async (): Promise<void> => {
          const { about, phoneNumber, website } = fields;

          const userProfile = await Profile.findOne({ user: userId });
          const profileId = userProfile?._id;

          const profile = await Profile.findByIdAndUpdate(
            {
              _id: profileId,
            },
            {
              $set: {
                user: userId,
                about,
                phoneNumber,
                website,
                photo: newPath.replace(/\\/g, "/"),
              },
            },
            {
              new: true,
            }
          );

          res.status(202).json(profile);
        };

        updateProfile();
      });
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal Server Error!"));
    }
  }
);

export default updateProfile;
