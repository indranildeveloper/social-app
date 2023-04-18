import Joi from "joi";

const educationSchema = Joi.object({
  institute: Joi.string().label("Institute").required(),
  from: Joi.string().label("From").required(),
  to: Joi.string().label("To"),
  isPresent: Joi.boolean().label("Is Present").required(),
  degree: Joi.string().label("Degree").required(),
  description: Joi.string().label("Description").required(),
});

export default educationSchema;
