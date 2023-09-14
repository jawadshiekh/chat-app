const { okResponse, serverErrorResponse, badRequestResponse } = require("generic-response");

const chatService = require("../services/chats.services");

const getMyAllChats = async (req, res) => {
  try {
    const chats = await chatService.getMyAllChats(req);

    const response = okResponse(chats);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const startPrivateChat = async (req, res) => {
  try {
    const chatId = await chatService.startPrivateChat(req);

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
  const chatId = req.params.chatId;

  try {
    const messages = await chatService.getAllMessagesOfParticularChat(chatId);
    console.log(messages, "--------------")
    const response = okResponse(messages);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createMessagesOfParticularChat = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    await chatService.createMessagesOfParticularChat(chatId, req);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createGroupChat = async (req, res) => {
  try {
    await chatService.createGroupChat(req);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const addParticipantsInGroup = async (req, res) => {
  try {
    await chatService.addParticipantsInGroup(req);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteParticipantsFromGroup = async (req, res) => {
  try {
    await chatService.deleteParticipantsFromGroup(req);

    const response = okResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const editGroupInfo = async (req, res) => {
  try {
    await chatService.editGroupInfo(req);

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
