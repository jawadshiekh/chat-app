const { okResponse, badRequestResponse, serverErrorResponse, notFoundResponse } = require("generic-response");

const usersService = require("../services/users.services");
const { USERS_RESPONSES } = require("../constants/responses");

const getAllUsers = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await usersService.getAllUsers(userId);

    const response = okResponse(result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const getSingleUser = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const result = await usersService.getSingleUser(userId);

    if (!result) {
      const response = notFoundResponse(USERS_RESPONSES.NOT_FOUND)
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
  const { phoneNumber } = req.body;

  try {
    const result = await usersService.registerUser(phoneNumber);

    const response = okResponse(null, result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const verifyUser = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const result = await usersService.verifyOtp(phoneNumber, otp);

    if (result?.error) {
      const response = badRequestResponse(result.error);
      return res.status(response.status.code).json(response);
    }

    const response = okResponse(result); // sending JWT token
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateUser = async (req, res) => {
  const body = req.body;
  const avatar = req.file.avatar;

  try {
    await usersService.updateUser(body, avatar);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const logoutUser = async (req, res) => {
  const { userId } = req.user;
  const { phoneNumber } = req.body;

  try {
    await usersService.logoutUser(userId, phoneNumber);

    const response = okResponse();
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
  verifyUser,
  updateUser,
  logoutUser,
};
