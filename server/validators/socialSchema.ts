import Joi from "joi";

const socialSchema = Joi.object({
  facebook: Joi.string().label("Facebook"),
  instagram: Joi.string().label("Instagram"),
  github: Joi.string().label("Github"),
  linkedIn: Joi.string().label("LinkedIn"),
  twitter: Joi.string().label("Twitter"),
  youtube: Joi.string().label("Youtube"),
});

export default socialSchema;
