import Joi from "joi";

const postSchema = Joi.object({
  text: Joi.string().label("Text").required(),
  photo: Joi.string().label("Photo"),
  likes: Joi.array().items(Joi.string()).label("Likes"),
  comments: Joi.array().items(
    Joi.object().keys({
      text: Joi.string().label("Text"),
      user: Joi.string().label("User"),
    })
  ),
});

export default postSchema;
