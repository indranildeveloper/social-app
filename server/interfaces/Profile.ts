import { ObjectId } from "mongoose";

interface IEducation {
  id: string;
  institute: string;
  from: string;
  to: string;
  isPresent: boolean;
  degree: string;
  description: string;
}

interface IExperience {
  id: string;
  company: string;
  from: string;
  to: string;
  isPresent: boolean;
  position: string;
  description: string;
}

interface IProfile {
  user: ObjectId;
  about: string;
  phoneNumber: number;
  website: string;
  address: {
    country: string;
    state: string;
    zip: string;
  };
  photo: string;
  socialMediaUrls: {
    facebook?: string;
    instagram?: string;
    github?: string;
    linkedIn?: string;
    twitter?: string;
    youtube?: string;
  };
  education: Array<IEducation>;
  experience: Array<IExperience>;
  skills: Array<string>;
}

export default IProfile;
