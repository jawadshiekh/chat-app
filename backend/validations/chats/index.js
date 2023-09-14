const Joi = require("joi");

const startPrivateChatSchema = Joi.object({
    query: Joi.object({}),
    params: Joi.object({
        recipientId: Joi.number().required(),
    }),
    body: Joi.object({}),
});

module.exports = {
    startPrivateChatSchema
};