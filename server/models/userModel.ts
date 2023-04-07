import mongoose, { Model } from "mongoose";
import { IUser } from "../interfaces/User";

const { Schema } = mongoose;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    about: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is required!"],
    },
    website: {
      type: String,
    },
    address: {
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
      },
    },
    photo: {
      type: String,
    },
    socialMediaUrls: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      github: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
      twitter: {
        type: String,
      },
      youtube: {
        type: String,
      },
    },
    education: [
      {
        institute: {
          type: String,
        },
        from: {
          type: String,
        },
        to: {
          type: String,
        },
        isPresent: {
          type: Boolean,
        },
        degree: {
          type: String,
        },
      },
    ],
    experience: [
      {
        company: {
          type: String,
        },
        from: {
          type: String,
        },
        to: {
          type: String,
        },
        isPresent: {
          type: Boolean,
        },
        position: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
