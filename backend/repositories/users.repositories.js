const prisma = require("../database/db");

const getAllUsers = async (userId) => {
    const users = await prisma.users.findMany({
        where: {
            id: { not: userId }
        },
        select: {
            id: true,
            username: true,
            avatar: true,
        }
    });

    return users;
};

const getUserByNumber = async (phoneNumber) => {
    const user = await prisma.users.findFirst({
        where: { phoneNumber }
    });

    return user;
};

const getSingleUser = async (userId) => {
    const user = await prisma.users.findUnique({
        select: {
            username: true,
            avatar: true,
        },
        where: {
            id: userId
        }
    });

    return user;
};

const createUser = async (phoneNumber) => {
    const user = await prisma.users.create({
        data: { phoneNumber }
    });

    return user;
};

const updateUser = async (data, avatar) => {
    await prisma.users.updateMany({
        data: {
            ...data,
            avatar
        }
    });
};

const setOtp = async (phoneNumber, otp) => {
    await prisma.users.update({
        data: { otp, otpCreatedAt: new Date() },
        where: { phoneNumber }
    });
};

const logoutUser = async (userId, phoneNumber) => {
    await prisma.users.update({
        data: { refreshToken: null },
        where: { userId, phoneNumber }
    });
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    getUserByNumber,
    setOtp,
    logoutUser,
};