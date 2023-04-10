import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).label("Name").required(),
  email: Joi.string().email().label("Email").required(),
  // Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters,
  // one numeric and one special character
  password: Joi.string()
    .min(8)
    .pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/)
    .message(
      "Password should contain one uppercase letter, one lowercase letter, one number and one special character!"
    )
    .label("Password")
    .required(),
  confirmPassword: Joi.ref("password"),
});

export default registerSchema;
