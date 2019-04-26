const mongoose = require("mongoose");

const UserActivationTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const UserActivationTokenModel = mongoose.model(
  "UserActivationToken",
  UserActivationTokenSchema
);

module.exports = UserActivationTokenModel;
