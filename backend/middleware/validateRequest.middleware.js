const { badRequestResponse } = require("generic-response");

const validateRequest = (schema) => (req, res, next) => {
  const { body, params, query } = req;

  const { error } = schema.validate({ body, params, query });

  if (error) {
    const response = badRequestResponse(error.details[0].message);
    return res.status(response.status.code).json(response);
  }

  next();
};

module.exports = validateRequest;
