import mongoose, { Model } from "mongoose";
import IPost from "../interfaces/Post";

const { Schema } = mongoose;

const userSchema = new Schema<IPost>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User: Model<IPost> = mongoose.model<IPost>("User", userSchema);
export default User;
