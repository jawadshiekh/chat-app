const jwt = require("jsonwebtoken");
const { forbiddenResponse, unauthorizedResponse } = require("generic-response");

const { ERROR_RESPONSES } = require("../constants/responses");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    const response = forbiddenResponse(ERROR_RESPONSES.TOKEN_NOT_PROVIDED);
    return res.status(response.status.code).json(response);
  }

  if (token.startsWith('Bearer ')) {
    token = token.substring(7);
  } else {
    const response = forbiddenResponse(ERROR_RESPONSES.INVALID_AUTHORIZATION_HEADER_FORMAT);
    return res.status(response.status.code).json(response);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      const response = unauthorizedResponse(ERROR_RESPONSES.INVALID_TOKEN);
      return res.status(response.status.code).json(response);
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;

