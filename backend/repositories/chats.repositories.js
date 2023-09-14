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
    const existingChat = await prisma.chat.findFirst({
        where: {
            type: "private",
            Participants: {
                AND: [
                    {
                        userId: senderId,
                    },
                    {
                        userId: recipientId,
                    },
                ],
            },
        },
        select: {
            id: true,
        },
    });

    return existingChat?.id;
};

const getChatMessages = async (chatId) => {
    const messages = await prisma.chats.findMany({
        where: { id: chatId },
        include: {
            Messages: true
        }
    });

    return messages;
};

const insertChatMessage = async (chatId, senderId, content) => {
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
        participants.map(participant => ({ chatId, participant }));

    await prisma.participants.createMany({
        data: [participantRecords]
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
    editGroupInfo,
}