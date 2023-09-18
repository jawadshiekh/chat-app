const { okResponse, serverErrorResponse, badRequestResponse } = require("generic-response");

const chatService = require("../services/chats.services");

const getMyAllChats = async (req, res) => {
  const userId = req.user.userId;

  try {
    const chats = await chatService.getMyAllChats(userId);

    const response = okResponse(chats);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const startPrivateChat = async (req, res) => {
  const { userId: senderId } = req.user;
  const recipientId = parseInt(req.params.recipientId);

  try {
    const chatId = await chatService.startPrivateChat(senderId, recipientId);

    if (chatId?.error) {
      const response = badRequestResponse(chatId.error);
      return res.status(response.status.code).json(response);
    }

    const response = okResponse({ chatId });
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const getAllMessagesOfParticularChat = async (req, res) => {
  const chatId = parseInt(req.params.chatId);

  try {
    const messages = await chatService.getAllMessagesOfParticularChat(chatId);

    const response = okResponse(messages);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createMessagesOfParticularChat = async (req, res) => {
  const chatId = parseInt(req.params.chatId);
  const { userId: senderId } = req.user;
  let { content } = req.body;
  const document = req.file;

  if (content === undefined) content = null;

  try {
    await chatService.createMessagesOfParticularChat(chatId, senderId, content, document);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createGroupChat = async (req, res) => {
  const { name, participants } = req.body;
  const icon = req.file.icon;

  try {
    await chatService.createGroupChat(name, participants, icon);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const addParticipantsInGroup = async (req, res) => {
  const chatId = parseInt(req.params.groupId);
  const { participants } = req.body;

  try {
    await chatService.addParticipantsInGroup(chatId, participants);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteParticipantsFromGroup = async (req, res) => {
  const chatId = parseInt(req.params.groupId);
  const { participants } = req.body;

  try {
    await chatService.deleteParticipantsFromGroup(chatId, participants);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const editGroupInfo = async (req, res) => {
  const chatId = parseInt(req.params.groupId);
  const data = req.body;
  const icon = req.file.icon;

  try {
    await chatService.editGroupInfo(chatId, data, icon);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
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
