import Joi from "joi";

export const createUserBodySchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
