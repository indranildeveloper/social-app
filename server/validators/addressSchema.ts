import Joi from "joi";

const addressSchema = Joi.object({
  country: Joi.string().label("Country").required(),
  state: Joi.string().label("State").required(),
  zip: Joi.string().label("Zip").required(),
});

export default addressSchema;
