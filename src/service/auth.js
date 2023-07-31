const { omit } = require('lodash');
const UserModel = require('../models/user');

const createUser = async (name, email, password) => {
  try {
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Create the user
    const user = await new UserModel({
      name,
      email,
      password,
    });
    await user.save();
    const sanitizedUser = omit(user.toJSON(), 'password');
    return sanitizedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser
};
