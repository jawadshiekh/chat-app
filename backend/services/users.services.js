const jwt = require("jsonwebtoken");

const usersQuery = require("../repositories/users.repositories");

const { ERROR_RESPONSES } = require("../constants/responses");

const getAllUsers = async () => {
  try {
    const users = await usersQuery.getAllUsers();

    return users;
  } catch (err) {
    throw new Error(err);
  }

};

const getSingleUser = async (userId) => {
  userId = parseInt(userId);

  try {
    const user = await usersQuery.getSingleUser(userId);

    return user;
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }

};

const registerUser = async (username, email, password) => {
  try {
    const existingUser = await usersQuery.getUserByEmail(email);

    if (existingUser) {
      return { error: ERROR_RESPONSES.EMAIL_ALREADY_EXISTS };
    }

    const user = await usersQuery.createUser(username, email, password, profilePicture);

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    return {
      token,
      data: {
        userId: user.id,
        username: user.username,
        email: user.email,
      }
    };
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async () => {

};

const loginUser = async (email, password) => {
  try {
    const user = await usersQuery.getUserByEmail(email);

    if (!user) {
      return { error: ERROR_RESPONSES.INCORRECT_CREDENTIALS };
    }

    if (password !== user.password) {
      return { error: ERROR_RESPONSES.INCORRECT_CREDENTIALS };
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    return {
      token,
      data: {
        userId: user.id,
        username: user.username,
        email: user.email,
      }
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  registerUser,
  updateUser,
  loginUser
};
