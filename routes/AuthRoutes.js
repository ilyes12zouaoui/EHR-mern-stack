const router = require("express").Router();
const AuthMiddleWares = require("../middlewaresAndValidators/AuthMiddleWares");
const AuthValidators = require("../middlewaresAndValidators/AuthValidators");
const AuthController = require("../controllers/AuthController");
const UploadFileMiddleWares = require("../middlewaresAndValidators/UploadFileMiddleWares");
const UploadFileValidators = require("../middlewaresAndValidators/UploadFileValidators");
const UsersController = require("../controllers/UsersController");

router.post(
  "/SignIn",
  AuthValidators.signInValidator,
  AuthController.signInController
);

router.post(
  "/SignUp",
  AuthValidators.signUpValidator,
  AuthController.signUpController
);

router.put(
  "/SignOut",
  AuthMiddleWares.authentication,
  AuthController.signOutController
);

router.get(
  "/getConnectedUsers",
  AuthMiddleWares.authentication,
  UsersController.getConnectedUsers
);

router.put(
  "/changeProfilePicture",
  AuthMiddleWares.authentication,
  UploadFileMiddleWares.uploadFileByName("image"),
  UploadFileValidators.fileExistsValidator,
  AuthController.changeProfileImage
);

router.get(
  "/AccountActivation/:id",
  AuthValidators.accountActivationValidator,
  AuthController.accountActivationController
);

router.get(
  "/sendAccountActivationEmail/:id",
  AuthValidators.sendAccountActivationEmailValidator,
  AuthController.sendAccountActivationEmailController
);

module.exports = router;
