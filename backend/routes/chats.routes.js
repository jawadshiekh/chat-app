const express = require("express");

const { startPrivateChatSchema } = require("../validations/chats");

const verifyToken = require("../middleware/verifyToken.middleware");
const validateRequest = require("../middleware/validateRequest.middleware");

const {
    getMyAllChats,
    getAllMessagesOfParticularChat,
    createMessagesOfParticularChat,
    startPrivateChat,
    createGroupChat,
    addParticipantsInGroup,
    deleteParticipantsFromGroup,
    editGroupInfo,
} = require("../controllers/chats.controllers");

const router = express.Router();

// private/group chats
router.get("/", verifyToken, getMyAllChats);
router.get("/:chatId/messages", verifyToken, getAllMessagesOfParticularChat);
router.post("/:chatId/messages", verifyToken, createMessagesOfParticularChat);

// private chats
router.get("/start/private/:recipientId", verifyToken, validateRequest(startPrivateChatSchema), startPrivateChat);

// group chats
router.post("/group", verifyToken, createGroupChat);
router.post("/group/:groupId/add-participants", verifyToken, addParticipantsInGroup);
router.post("/group/:groupId/delete-participants/:userId", verifyToken, deleteParticipantsFromGroup);
router.patch("/group/:groupId", verifyToken, editGroupInfo);

module.exports = router;
