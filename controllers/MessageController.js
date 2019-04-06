const { Message } = require("../models/Message");

const getMessagesByUsersId = async (req, res, next) => {
  const messages = await Message.find({
    ownerId: req.body.ownerId,
    recieverId: req.body.recieverId
  }).exec();
  return res.send(messages);
};

const getMessages = async (req, res) => {
  const messages = Message.find().exec();
  return res.send(messages);
};
module.exports = {
  getMessages,
  getMessagesByUsersId
};
