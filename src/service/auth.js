import moment from "moment-timezone";
import UserModel from "../models/user.cjs";
import PasswordResetToken from "../models/passwordResetToken.cjs";

import * as messages from "../json/messages.json" assert { type: "json" };


const createUser = async (name, email, password) => {
  try {
    // Check if the email is already registered in your database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error(messages.AUTH_MESSAGES.EXISTS_EMAIL);
    }

    // Create the user in your database
    const newUser = new UserModel({
      name,
      email,
      password
    });
    const savedUser = await newUser.save();

    return savedUser; // Return the user created in your database
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new Error(messages.AUTH_MESSAGES.EMAIL_NOT_EXISTS);
    }

    // Check if the password is correct
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      throw new Error(messages.AUTH_MESSAGES.INVALID_PASSWORD);
    }

    // Generate JWT token
    const token = existingUser.generateJWT();

    const sanitizedUser = existingUser.toJSON();
    return { sanitizedUser, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const resetPassword = async (email, password, resetToken) => {
  try {
    const resetTokenObject = await PasswordResetToken.findOneAndRemove({
      userEmail: email,
      resetToken
    });

    if (!resetTokenObject) {
      throw new Error("Invalid reset token");
    }
    if (moment().isAfter(resetTokenObject.expires)) {
      throw new Error("Reset token has expired");
    }

    const user = await UserModel.findOne({
      email: resetTokenObject.userEmail
    }).exec();
    user.password = password;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// const resetPasswordRequest = async (email) => {

//   try {
//     const user = await User.findOne({ email }).exec();

//     if (user) {
//       const passwordResetObj = await PasswordResetToken.generate(user);
//       emailProvider.sendPasswordReset(passwordResetObj);
//       res.status(httpStatus.OK);
//       return res.json('success');
//     }

export default {
  createUser,
  loginUser,
  resetPassword
};
