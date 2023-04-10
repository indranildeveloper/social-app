import mongoose, { Model } from "mongoose";
import IProfile from "../interfaces/Profile";

const { Schema } = mongoose;

const userSchema = new Schema<IProfile>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    about: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    website: {
      type: String,
    },
    photo: {
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

const User: Model<IProfile> = mongoose.model<IProfile>("User", userSchema);
export default User;
