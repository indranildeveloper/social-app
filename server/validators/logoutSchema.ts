import Joi from "joi";

const logoutSchema = Joi.object({
  userId: Joi.string().required().label("User Id"),
});

export default logoutSchema;
