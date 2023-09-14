const Joi = require("joi");

const chatCreateSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({name: Joi.string().required()}),
});

const chatUpdateSchema = Joi.object({
    query: Joi.object({}),
    params: Joi.object({bookId: Joi.number().required()}),
    body: Joi.object({name: Joi.string().optional()}).min(1),
  });

module.exports = {chatCreateSchema, chatUpdateSchema};