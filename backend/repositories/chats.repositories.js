const prisma = require("../database/db");

const getMyAllChats = async (userId) => {
    const chats = await prisma.chats.findMany({
        where: {
            Participants: {
                some: {
                    userId: userId,
                },
            },
        },
        include: {
            Participants: {
                where: {
                    userId: {
                        not: userId,
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            },
            Messages: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            },
        },
    });


    console.log(chats);


    return chats;
};

const createNewChat = async (name, icon, type) => {
    const chat = await prisma.chats.create({
        data: {
            name,
            icon,
            type
        }
    })

    return chat.id;
};

const searchForExistingChatId = async (senderId, recipientId) => {
    const chat = await prisma.chats.findMany({
        where: {
            type: "private",
            Participants: {
                some: {
                    userId: senderId,
                    chat: {
                        Participants: {
                            some: {
                                userId: recipientId,
                            },
                        },
                    },
                },
            },
        },
        select: {
            id: true,
        },
    });

    return chat;
};

const getChatMessages = async (chatId) => {
    const messages = await prisma.chats.findMany({
        where: { id: chatId },
        select: {
            Messages: {
                select: {
                    senderId: true,
                    content: true,
                    createdAt: true,
                    file: true
                }
            }
        }
    });

    return messages;
};

const insertChatMessage = async (chatId, senderId, content, fileId) => {
    await prisma.messages.create({
        data: { chatId, senderId, content, fileId },
    });
};

const insertChatFile = async (filename, originalname, mimetype, size) => {
    const createdFile = await prisma.files.create({
        data: {
            file: filename,
            filename: originalname,
            mimeType: mimetype,
            size: size,
        },
    });

    return createdFile.id;
};

const addParticipantsInChat = async (chatId, participants) => {
    const participantRecords =
        participants.map(participant => ({ chatId, userId: participant }));

    await prisma.participants.createMany({
        data: participantRecords
    })
};

const deleteParticipantsFromGroup = async (chatId, participants) => {
    await prisma.participants.deleteMany({
        where: {
            chatId,
            userId: {
                in: participants,
            },
        }
    })
};

const editGroupInfo = async (chatId, data, icon) => {
    await prisma.chats.update({
        data: { ...data, icon },
        where: { id: chatId }
    })
};

module.exports = {
    getMyAllChats,
    createNewChat,
    searchForExistingChatId,
    getChatMessages,
    insertChatMessage,
    insertChatFile,
    addParticipantsInChat,
    deleteParticipantsFromGroup,
    editGroupInfo,
};