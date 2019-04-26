const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/ChatController");

router.post(
  "/conversation/createConversation",
  ChatController.createConversation
);

router.get("/conversation/all", ChatController.getConversations);
router.post(
  "/conversation/getByPaticpantsAndType",
  ChatController.getConversationByPaticipantsAndType
);
router.get(
  "/conversation/getConversationsByUserId/:id",
  ChatController.getConversationsByUserId
);

router.get("/conversation/:id", ChatController.getConversationById);

router.post("/message/createMessage", ChatController.createMessage);

router.get("/message/all", ChatController.getMessages);
router.get(
  "/message/byConversationId/:id",
  ChatController.getMessagesByConversationId
);

router.put(
  "/message/putMessageSeenTime/:id",
  ChatController.putMessageSeenTime
);
router.get("/message/:id", ChatController.getMessageById);

router.get("/user", ChatController.getUsers);
router.get("/user/getConnectedUsers", ChatController.getConnectedUsers);

module.exports = router;
