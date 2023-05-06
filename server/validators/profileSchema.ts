import Joi from "joi";

const profileSchema = Joi.object({
  about: Joi.string().label("About"),
  phoneNumber: Joi.string().label("Phone Number"),
  website: Joi.string().label("Website"),
  photo: Joi.string().label("Photo"),
});

export default profileSchema;
