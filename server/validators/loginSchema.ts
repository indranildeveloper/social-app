import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().label("Email").required(),
  password: Joi.string()
    .min(8)
    .pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/)
    .message(
      "Password should contain one uppercase letter, one lowercase letter, one number and one special character!"
    )
    .label("Password")
    .required(),
});

export default loginSchema;
