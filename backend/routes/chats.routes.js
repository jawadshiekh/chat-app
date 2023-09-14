const express = require("express");

const verifyToken = require("../middleware/verifyToken.middleware");

const {
    getMyAllChats,
    getAllMessagesOfParticularChat,
    createMessagesOfParticularChat,
    startPrivateChat,
    createGroupChat,
    addParticipantsInGroup,
    editGroupInfo,
} = require("../controllers/chats.controllers");

const router = express.Router();

// private/group chats
router.get("/", verifyToken, getMyAllChats);
router.get("/:chatId/messages", verifyToken, getAllMessagesOfParticularChat);
router.post("/:chatId/messages", verifyToken, createMessagesOfParticularChat);

// private chats
router.post("/private/start/:recipientId", verifyToken, startPrivateChat);

// group chats
router.post("/group", verifyToken, createGroupChat);
router.post("/group/:groupId/add-participants", verifyToken, addParticipantsInGroup);
router.patch("/group/:groupId", verifyToken, editGroupInfo);

module.exports = router;
