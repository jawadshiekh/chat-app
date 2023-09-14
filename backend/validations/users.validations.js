const Joi = require("joi");

const usersCreateSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({name: Joi.string().required()}),
});

const usersUpdateSchema = Joi.object({
    query: Joi.object({}),
    params: Joi.object({bookId: Joi.number().required()}),
    body: Joi.object({name: Joi.string().optional()}).min(1),
  });

module.exports = {usersCreateSchema, usersUpdateSchema};