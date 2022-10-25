import Joi from "joi";

export const createBoardSchema = Joi.object({
  name: Joi.string().required(),
});

export const editBoardSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
});

export const createColumnSchema = Joi.object({
  name: Joi.string().required(),
  board: Joi.string().required(),
});

export const editColumnSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  board: Joi.string(),
});

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().required(),
  board: Joi.string().required(),
  subtasks: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      done: Joi.boolean().required(),
    })
  ),
});

export const editTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  board: Joi.string(),
  subtasks: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      done: Joi.boolean(),
    })
  ),
});
