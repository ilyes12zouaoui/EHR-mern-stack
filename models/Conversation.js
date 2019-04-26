const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["group", "oneToOne"]
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: function() {
      return this.type == "group";
    }
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Conversation", conversationSchema);
