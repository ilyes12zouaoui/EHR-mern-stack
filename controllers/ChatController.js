const UserModel = require("../models/UserModel");
const ConversationModel = require("../models/Conversation");
const MessageModel = require("../models/Message");

//conversation
//createConversation,
//getConversationById,
//getConversations,
//getConversationsByUserId
//getConversationByPaticipantsAndType

//message
//createMessage,
//getMessageById,
//getMessages,
//getMessagesByConversationId,
//putMessageSeenTime

//users
//getUsers
//getConnectedUsers

//create conversation
const createConversation = async (req, res) => {
  let FinalAndQuery = [{ type: req.body.type }];
  for (let participantId of req.body.participants) {
    FinalAndQuery = [...FinalAndQuery, { participants: participantId }];
  }

  const conversation = await ConversationModel.findOne({
    $and: FinalAndQuery
  }).exec();
  if (!conversation) {
    const newConversation = new ConversationModel({
      ...req.body
    });

    await newConversation.save();

    return res.send(newConversation);
  } else {
    return res.send(conversation);
  }
};

//getConversationById
const getConversationById = async (req, res) => {
  const conversation = await ConversationModel.findById(req.params.id).exec();
  if (!conversation) return res.send("no conversation was find");
  res.send(conversation);
};

//getConversations
const getConversations = async (req, res) => {
  const conversations = await ConversationModel.find().exec();
  res.send(conversations);
};

//getConversationsByUserId
const getConversationsByUserId = async (req, res) => {
  const conversations = await ConversationModel.find({
    participants: req.params.id
  }).exec();
  res.send(conversations);
};

//getConversationByPaticipantsAndType
const getConversationByPaticipantsAndType = async (req, res) => {
  console.log("ssdsds");
  console.log(req.body);
  let FinalAndQuery = [{ type: req.body.type }];
  for (let participantId of req.body.participants) {
    FinalAndQuery = [...FinalAndQuery, { participants: participantId }];
  }

  const conversation = await ConversationModel.findOne({
    $and: FinalAndQuery
  }).exec();
  if (!conversation) return res.send("no conversation was find");
  res.send(conversation);
};

//create message
const createMessage = async (req, res) => {
  let message = new MessageModel({
    ...req.body
  });
  message = await message.save();
  res.send(message);
};

//getMessageById,
//getMessages,
//getMessagesByConversationId,
const getMessageById = async (req, res) => {
  const message = await MessageModel.findById(req.params.id).exec();
  res.send(message);
};
const getMessages = async (req, res) => {
  const messages = await MessageModel.find().exec();
  res.send(messages);
};

const getMessagesByConversationId = async (req, res) => {
  const messages = await MessageModel.find({
    conversation: req.params.id
  }).exec();
  res.send(messages);
};

const putMessageSeenTime = async (req, res) => {
  await MessageModel.update(
    { _id: req.params.id },
    {
      $set: { seenTime: Date.now() }
    }
  );
  res.send("updated message bb");
};

//getusers
const getUsers = async (req, res) => {
  const users = await UserModel.find()
    .sort({ isLoggedIn: -1 })
    .exec();
  res.send(users);
};

//getConnectedUsers
const getConnectedUsers = async (req, res) => {
  const users = await UserModel.find({ isLoggedIn: true }).exec();
  res.send(users);
};

module.exports = {
  createConversation,
  getConversationById,
  getConversations,
  getConversationsByUserId,
  getConversationByPaticipantsAndType,
  createMessage,
  getMessageById,
  getMessages,
  getMessagesByConversationId,
  putMessageSeenTime,
  getUsers,
  getConnectedUsers
};
