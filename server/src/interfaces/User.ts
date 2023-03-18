interface IEducation {
  institute: string;
  from: string;
  to: string;
  isPresent: boolean;
  degree: string;
}

interface IExperience {
  company: string;
  from: string;
  to: string;
  isPresent: boolean;
  position: string;
}

interface IUser {
  name: string;
  email: string;
  about: string;
  password: string;
  phoneNumber: number;
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
}

export { IUser };
