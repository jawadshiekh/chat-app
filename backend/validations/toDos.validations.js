const Joi = require("joi");

const toDoCreateSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({ do: Joi.string().required() }),
});

const toDoUpdateSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({ bookId: Joi.number().required() }),
  body: Joi.object({ do: Joi.string().optional() }).min(1),
});

module.exports = { toDoCreateSchema, toDoUpdateSchema };