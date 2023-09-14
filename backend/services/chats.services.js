const prisma = require("../database/db");

const chatQuery = require("../repositories/chats.repositories");

const getMyAllChats = async (req) => {
  const { userId } = req.user;

  try {
    let chats = await chatQuery.getMyAllChats(userId);

    return chats;
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
};

const startPrivateChat = async (req) => {
  const { userId: senderId } = req.user;
  const recipientId = +req.params.recipientId;

  try {
    if (senderId === recipientId) {
      return { error: "Cannot chat yourself." };
    }

    const existingChatId = await chatQuery.searchForExistingChatId(senderId, recipientId);

    if (existingChatId.length) {
      return existingChatId.id;
    } else {
      const chatId = await chatQuery.createNewChat(null, null, "private");

      await chatQuery.addParticipantsInChat(chatId, [senderId, recipientId]);

      return chatId;
    }
  } catch (err) {
    throw new Error(err);
  }
};

const getAllMessagesOfParticularChat = async (chatId) => {
  try {
    const messages = await chatQuery.getChatMessages(chatId);

    return messages;
  } catch (error) {
    throw error;
  }
};

const createMessagesOfParticularChat = async (chatId, req) => {
  const { userId: senderId } = req.user;
  const { content } = req.body;

  try {
    console.log("chatId: ", chatId)
    console.log("senderId: ", senderId)
    console.log("content: ", content)
    await chatQuery.insertChatMessage(chatId, senderId, content);

  } catch (error) {
    throw error;
  }
};

const createGroupChat = async (req) => {
  const { name, profile, participants } = req.body;

  try {
    const chatId = await chatQuery.createNewChat(name, profile, "group");

    await chatQuery.addParticipantsInChat(chatId, participants);

    return chatId;
  } catch (error) {
    throw error;
  }
};

const addParticipantsInGroup = async (req) => {
  const { groupId: chatId } = req.params;
  const { participants } = req.body;

  try {
    await chatQuery.addParticipantsInChat(chatId, participants);
  } catch (error) {
    throw error;
  }
};

const editGroupInfo = async (req) => {
  const { groupId: chatId } = req.params;
  const data = req.body;

  await chatQuery.editGroupInfo(chatId, data);
};

const deleteParticipantsFromGroup = async (req) => {
  const { groupId: chatId } = req.params;
  const { participants } = req.body;

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
