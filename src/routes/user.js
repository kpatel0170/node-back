const express = require("express");
const validate = require("../middleware/validate");
const userController = require("../controller/user");
const userValidation = require("../validation/user");
const authMiddleware = require("../middleware/auth");
const user = require("../validation/user");

const userRouter = express.Router();

userRouter.get("/", authMiddleware.jwtAuthentication, userController.getUsers);

userRouter.get("/id", authMiddleware.jwtAuthentication, userController.getUser);

userRouter.put(
  "/:userId",
  authMiddleware.jwtAuthentication,
  validate(userValidation.updateProfile),
  userController.updateUser
);

userRouter.delete(
  "/:userId",
  authMiddleware.jwtAuthentication,
  userController.deleteUser
);

module.exports = userRouter;
