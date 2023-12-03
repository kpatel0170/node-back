const UserModel = require('../models/user');

const createUser = async (name, email, password) => {
  try {
    // Check if the email is already registered in your database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Create the user in your database
    const newUser = new UserModel({
      name,
      email,
      password,
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
      throw new Error('Email is not registered');
    }

    // Check if the password is correct
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      throw new Error('Password is incorrect');
    }

    // Generate JWT token
    const token = existingUser.generateJWT();

    const sanitizedUser = existingUser.toJSON();
    return { sanitizedUser, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  loginUser,
};
