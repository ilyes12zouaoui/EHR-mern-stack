const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  sentTime: {
    type: Date,
    default: Date.now()
  },

  seenTime: {
    type: Date
  }
});

module.exports = mongoose.model("Message", messageSchema);
