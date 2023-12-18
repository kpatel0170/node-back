const UserModel = require("../models/user");
const messages = require("../json/messages.json");

const getUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    const errorMessage = error.message || messages.GENERAL; // Fallback message
    throw new Error(errorMessage);
  }
};

const get10Users = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    // Query users with pagination
    const users = await UserModel.find().skip(skip).limit(limit);

    return users;
  } catch (error) {
    const errorMessage = error.message || messages.GENERAL.ERROR_OCCURRED; // Fallback message
    throw new Error(errorMessage);
  }
};

const getUser = async (id) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error(messages.USER_NOT_FOUND);
    }
    return user;
  } catch (error) {
    const errorMessage = error.message || messages.GENERAL; // Fallback message
    throw new Error(errorMessage);
  }
};

const updateUser = async (id, name, email, password) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error(messages.USER_NOT_FOUND);
    }
    user.name = name;
    user.email = email;
    user.password = password;
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    const errorMessage = error.message || messages.GENERAL; // Fallback message
    throw new Error(errorMessage);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error(messages.USER_NOT_FOUND);
    }
    await UserModel.deleteOne({ _id: id }); // Using UserModel directly to delete
  } catch (error) {
    const errorMessage = error.message || messages.GENERAL; // Fallback message
    throw new Error(errorMessage);
  }
};

module.exports = {
  getUsers,
  get10Users,
  getUser,
  updateUser,
  deleteUser
};
