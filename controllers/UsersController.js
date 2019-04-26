const UserModel = require("../models/UserModel");

const getConnectedUsers = async (req, res) => {
  const users = await UserModel.find({ isLoggedIn: true }).exec();

  return res.send({ users: users });
};

module.exports = {
  getConnectedUsers
};
