import Joi from "joi";

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export default refreshSchema;
