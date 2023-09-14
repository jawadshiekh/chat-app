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
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            profilePicture: true,
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

const createNewChat = async (name, profile, type) => {
    const chat = await prisma.chats.create({
        data: {
            name,
            profile,
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

// const searchForExistingChatId = async (senderId, recipientId) => {
//     const results = await prisma.$queryRaw`
//         SELECT c.id FROM Chats AS c
//         JOIN Participants AS p1 ON c.id = p1.chatId
//         JOIN Participants AS p2 ON c.id = p2.chatId
//         WHERE c.type = 'private' AND p1.userId = ${senderId} AND p2.userId = ${recipientId}
//     `;

//     return results;
// };

const getChatMessages = async (chatId) => {
    const messages = await prisma.chats.findMany({
        where: { id: +chatId },
        include: {
            Messages: true
        }
    });

    return messages;
};

const insertChatMessage = async (chatId, senderId, content) => {
    chatId = parseInt(chatId);

    await prisma.messages.create({
        data: {
            chatId,
            senderId,
            content,
        }
    });
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

const editGroupInfo = async (chatId, data) => {
    await prisma.chats.update({
        data: { ...data },
        where: { id: chatId }
    })
};

module.exports = {
    getMyAllChats,
    createNewChat,
    searchForExistingChatId,
    getChatMessages,
    insertChatMessage,
    addParticipantsInChat,
    deleteParticipantsFromGroup,
    editGroupInfo,
}