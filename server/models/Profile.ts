import mongoose, { Model } from "mongoose";
import IProfile from "../interfaces/Profile";

const { Schema } = mongoose;

const profileSchema = new Schema<IProfile>(
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
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
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
        id: {
          type: String,
          required: true,
        },
        institute: {
          type: String,
          required: true,
        },
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
        },
        isPresent: {
          type: Boolean,
          default: false,
        },
        degree: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    experience: [
      {
        id: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
        },
        isPresent: {
          type: Boolean,
          default: false,
        },
        position: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    // skills: {
    //   type: [String],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Profile: Model<IProfile> = mongoose.model<IProfile>(
  "Profile",
  profileSchema
);
export default Profile;
