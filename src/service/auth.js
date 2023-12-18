const UserModel = require("../models/user");
const messages = require("../json/messages.json");

const createUser = async (name, email, password) => {
  try {
    // Check if the email is already registered in your database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error(messages.AUTH_MESSAGES.EMAIL_EXISTS);
    }

    const newUser = new UserModel({
      name,
      email,
      password
    });
    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    const errorMessage = error.message || messages.GENERAL; // Fallback message
    throw new Error(errorMessage);
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
    const errorMessage = error.message || messages.GENERAL; // Fallback message
    throw new Error(errorMessage);
  }
};

module.exports = {
  createUser,
  loginUser
};
