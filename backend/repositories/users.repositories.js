const prisma = require("../database/db");

const getAllUsers = async (userId) => {
    const users = await prisma.users.findMany({
        where: {
            id: { not: userId }
        },
        select: {
            id: true,
            username: true,
            email: true,
            profilePicture: true,
        }
    });

    return users;
}

const getSingleUser = async (userId) => {
    const user = await prisma.users.findUnique({
        select: {
            username: true,
            email: true,
            profilePicture: true,
        },
        where: {
            id: userId
        }
    });

    return user;
}

const createUser = async (username, email, password, profilePicture) => {
    const user = await prisma.users.create({
        data: {
            username,
            email,
            password,
            profilePicture
        }
    });

    return user;
}

const getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: { email }
    });

    return user;
}

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    getUserByEmail,
}