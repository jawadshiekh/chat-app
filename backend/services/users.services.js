const jwt = require("jsonwebtoken");

const usersQuery = require("../repositories/users.repositories");
const generateOTP = require("../helpers/generateOtp");

const getAllUsers = async (userId) => {
  try {
    const users = await usersQuery.getAllUsers(userId);

    return users;
  } catch (err) {
    throw new Error(err);
  }

};

const getSingleUser = async (userId) => {
  try {
    const user = await usersQuery.getSingleUser(userId);

    return user;
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }

};

const registerUser = async (phoneNumber) => {
  try {
    let existingUser = await usersQuery.getUserByNumber(phoneNumber);

    if (!existingUser) {
      await usersQuery.createUser(phoneNumber);
    }

    const otp = "0000"; // send otp to user
    await usersQuery.setOtp(phoneNumber, otp);

    return "OTP sent successfully.";
  } catch (err) {
    throw new Error(err);
  }
};

const verifyOtp = async (phoneNumber, otp) => {
  try {
    const user = await usersQuery.getUserByNumber(phoneNumber);

    if (!user || !user.otp || !user.otpCreatedAt) {
      return { error: "Invalid request." };
    }

    const currentTime = new Date();
    const otpCreationTime = new Date(user.otpCreatedAt);

    const timeDifference = currentTime - otpCreationTime;

    const otpExpirationThreshold = process.env.OTP_EXPIRATION_THRESHOLD_IN_MINS * 60 * 1000;

    if (timeDifference > otpExpirationThreshold) {
      return { error: "OTP has expired." };
    }

    if (otp !== user.otp) {
      return { error: "Invalid OTP." };
    }

    // OTP is valid, resting otp
    await usersQuery.resetOtp(phoneNumber);

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY,
    );

    return {
      token,
      data: {
        userId: user.id
      }
    };
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async (data, avatar) => {
  try {
    await usersQuery.updateUser(data, avatar);
  } catch (err) {
    throw new Error(err);
  }
};

const logoutUser = async (userId, phoneNumber) => {
  try {
    await usersQuery.logoutUser(userId, phoneNumber);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  registerUser,
  verifyOtp,
  updateUser,
  logoutUser,
};
