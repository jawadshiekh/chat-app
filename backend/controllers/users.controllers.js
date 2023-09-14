const { okResponse, badRequestResponse, serverErrorResponse } = require("generic-response");

const usersService = require("../services/users.services");
const { USERS_RESPONSES } = require("../constants/responses");

const getAllUsers = async (req, res) => {
  try {
    const result = await usersService.getAllUsers();

    const response = okResponse(result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const getSingleUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await usersService.getSingleUser(userId);

    if (!result) {
      const response = badRequestResponse(USERS_RESPONSES.NOT_FOUND)
      return res.status(response.status.code).json(response);
    }

    const response = okResponse(result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, profilePicture = null } = req.body;

  try {
    const token = await usersService.registerUser(username, email, password, profilePicture);

    if (token?.error) {
      const response = badRequestResponse(token.error);
      return res.status(response.status.code).json(response);
    }

    const response = okResponse(token);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersService.loginUser(email, password);

    if (user?.error) {
      const response = badRequestResponse(user.error);
      return res.status(response.status.code).json(response);
    }

    const response = okResponse(user);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  registerUser,
  loginUser,
};
