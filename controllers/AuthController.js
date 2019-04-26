const UserModel = require("../models/UserModel");
const UserActivationTokenModel = require("../models/UserActivationToken");
const ROLES = require("../configurations/Roles");
const { EMAIL_TEMPLETES } = require("../configurations/Secrets");
const sendEmail = require("../helpers/email/SendEmail");
const crypto = require("crypto");
const { deleteFileFromPublicImages } = require("../helpers/DeleteFiles");

const signInController = async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email }).exec();
  if (user === null) {
    return res
      .status(400)
      .send({ errors: { global: "wrong username or password" } });
  }

  const compareResult = await user.comparePassword(req.body.password);

  if (compareResult !== true) {
    return res
      .status(400)
      .send({ errors: { global: "wrong username or password" } });
  }

  if (!user.isActive) {
    return res.status(400).send({
      errors: {
        global:
          "your account is inactive, pls check your e-mail to actviate it",
        userId: user._id
      }
    });
  }

  user.isLoggedIn = true;
  const token = user.generateAuthToken();
  user = await user.save();
  return res.status(200).send({
    token: token,
    user: {
      isLoggedIn: user.isLoggedIn,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      email: user.email,
      sexe: user.sexe,
      image: user.image,
      id: user._id
    }
  });
};

const signOutController = async (req, res) => {
  req.user.isLoggedIn = false;
  await req.user.save();
  return res.send({
    success: {
      global: "sign out"
    }
  });
};

const signUpController = async (req, res) => {
  const oldUser = await UserModel.findOne({ email: req.body.email }).exec();

  if (oldUser != null) {
    return res
      .status(400)
      .send({ errors: { email: "email already existant" } });
  }
  let user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    sexe: req.body.sexe,
    password: req.body.password,
    role: ROLES.SIMPLE_USER
  });

  await user.encryptPassword();
  user = await user.save();

  let userToken = new UserActivationTokenModel({
    token: crypto.randomBytes(20).toString("hex"),
    userId: user._id
  });

  userToken = await userToken.save();

  sendEmail(user, userToken.token, EMAIL_TEMPLETES.INSCRIPTION_VERIFICATION);

  res.send({
    success: {
      global: `a verification e-mail was sent to ${user.email} pls check it out`
    }
  });
};

//
const sendAccountActivationEmailController = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id }).exec();
  if (user === null) {
    return res.status(400).send({ errors: { global: "wrong credentiels" } });
  }

  const userTokenObject = await UserActivationTokenModel.findOne({
    userId: req.params.id
  }).exec();
  if (userTokenObject == null) {
    return res
      .status(400)
      .send({ errors: { global: "your account is activated" } });
  }
  sendEmail(
    user,
    userTokenObject.token,
    EMAIL_TEMPLETES.INSCRIPTION_VERIFICATION
  );

  return res.send({
    success: { global: "the activation e-mail was resent to " + user.email }
  });
};

const accountActivationController = async (req, res) => {
  const userTokenObject = await UserActivationTokenModel.findOneAndDelete({
    token: req.params.id
  }).exec();
  if (userTokenObject == null) {
    return res.status(400).send({ errors: { global: "wrong activation id" } });
  }

  await UserModel.findOneAndUpdate(
    { _id: userTokenObject.userId },
    {
      $set: { isActive: true }
    }
  ).exec();

  return res.send({
    success: { global: "your account is now activated " }
  });
};

const changeProfileImage = async (req, res) => {
  const oldImagePath = req.user.image;
  req.user.image = req.file.filename;

  if (oldImagePath == "defaultProfilePicture.jpg") {
    await req.user.save();
    return res.send({
      success: {
        global: "profile picture was updated successfuly",
        imageName: req.file.filename
      }
    });
  } else {
    deleteFileFromPublicImages(oldImagePath, async err => {
      await req.user.save();
      return res.send({
        success: {
          global: "profile picture was updated successfuly",
          imageName: req.file.filename
        }
      });
    });
  }
};

module.exports = {
  signInController,
  signUpController,
  accountActivationController,
  sendAccountActivationEmailController,
  changeProfileImage,
  signOutController
};
