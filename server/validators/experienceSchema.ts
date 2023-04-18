import Joi from "joi";

const experienceSchema = Joi.object({
  company: Joi.string().label("Company").required(),
  from: Joi.string().label("From").required(),
  to: Joi.string().label("To"),
  isPresent: Joi.boolean().label("Is Present").required(),
  position: Joi.string().label("Position").required(),
  description: Joi.string().label("Description").required(),
});

export default experienceSchema;
