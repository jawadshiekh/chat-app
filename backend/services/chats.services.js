const prisma = require("../database/db");

const chatQuery = require("../repositories/chats.repositories");

const getMyAllChats = async (userId) => {
  try {
    let chats = await chatQuery.getMyAllChats(userId);

    return chats;
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
};

const startPrivateChat = async (senderId, recipientId) => {
  try {
    if (senderId === recipientId) {
      return { error: "Cannot chat yourself." };
    }

    const existingChatId = await chatQuery.searchForExistingChatId(senderId, recipientId);

    if (existingChatId.length) {
      return existingChatId[0].id;
    }

    const chatId = await chatQuery.createNewChat(null, null, "private");

    await chatQuery.addParticipantsInChat(chatId, [senderId, recipientId]);

    return chatId;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllMessagesOfParticularChat = async (chatId) => {
  try {
    const messages = await chatQuery.getChatMessages(chatId);

    // will make this better ideally by query
    if (messages.length) {
      const groupedMessages = [];
      let currentDate = null;

      for (const message of messages[0].Messages) {
        const messageDate = message.createdAt.toISOString().split('T')[0];

        if (messageDate !== currentDate) {
          const currentGroup = {
            date: messageDate,
            data: [],
          };
          currentDate = messageDate;
          groupedMessages.push(currentGroup);
        }

        groupedMessages[groupedMessages.length - 1].data.push(message);
      }

      return groupedMessages;
    }
  } catch (error) {
    throw error;
  }
};

const createMessagesOfParticularChat = async (chatId, senderId, content, document) => {
  try {
    const messageData = {
      chatId,
      senderId,
      content,
    };

    if (document) {
      const { filename, originalname, mimetype, size } = document;

      messageData.file = {
        create: {
          file: filename,
          filename: originalname,
          mimeType: mimetype,
          size: size,
        },
      };
    }

    await chatQuery.insertChatMessage(messageData);

  } catch (error) {
    throw error;
  }
};

const createGroupChat = async (name, participants, icon) => {
  try {
    const chatId = await chatQuery.createNewChat(name, icon, "group");

    await chatQuery.addParticipantsInChat(chatId, participants);

    return chatId;
  } catch (error) {
    throw error;
  }
};

const addParticipantsInGroup = async (chatId, participants) => {
  try {
    await chatQuery.addParticipantsInChat(chatId, participants);
  } catch (error) {
    throw error;
  }
};

const editGroupInfo = async (chatId, data, icon) => {
  await chatQuery.editGroupInfo(chatId, data, icon);
};

const deleteParticipantsFromGroup = async (chatId, participants) => {
  try {
    await chatQuery.deleteParticipantsFromGroup(chatId, participants);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMyAllChats,
  startPrivateChat,
  getAllMessagesOfParticularChat,
  createMessagesOfParticularChat,
  createGroupChat,
  addParticipantsInGroup,
  deleteParticipantsFromGroup,
  editGroupInfo,
};
