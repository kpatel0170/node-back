const userService = require("../service/user");
const logger = require("../config/logger");
const enums = require("../json/enums.json");
const messages = require("../json/messages.json");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(enums.HTTP_CODES.OK).json(users);
  } catch (error) {
    logger.error(error.message);
    return res
      .status(enums.HTTP_CODES.DUPLICATE_VALUE)
      .json({ error: error.message });
  }
};

const get10Users = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const users = await userService.get10Users(page, limit);
    return res.status(enums.HTTP_CODES.OK).json(users);
  } catch (error) {
    logger.error(error.message);
    return res
      .status(enums.HTTP_CODES.DUPLICATE_VALUE)
      .json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);
    return res.status(enums.HTTP_CODES.OK).json(user);
  } catch (error) {
    logger.error(error.message);
    return res
      .status(enums.HTTP_CODES.DUPLICATE_VALUE)
      .json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { userId } = req.params;
    if (!name || !email || !password) {
      return res
        .status(enums.HTTP_CODES.BAD_REQUEST)
        .json({ message: messages.AUTH_MESSAGES.FILL_DETAILS });
    }
    if (userId !== req.user.id) {
      return res
        .status(enums.HTTP_CODES.UNAUTHORIZED)
        .json({ message: messages.AUTH_MESSAGES.UNAUTHORIZED });
    }
    const user = await userService.updateUser(
      req.user.id,
      name,
      email,
      password
    );
    return res
      .status(enums.HTTP_CODES.OK)
      .json({ message: messages.USER_UPDATED, data: user });
  } catch (error) {
    logger.error(error.message);
    return res
      .status(enums.HTTP_CODES.DUPLICATE_VALUE)
      .json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId !== req.user.id) {
      return res
        .status(enums.HTTP_CODES.UNAUTHORIZED)
        .json({ message: messages.AUTH_MESSAGES.UNAUTHORIZED });
    }
    await userService.deleteUser(req.user.id);
    return res
      .status(enums.HTTP_CODES.OK)
      .json({ message: messages.USER_DELETED });
  } catch (error) {
    logger.error(error.message);
    return res
      .status(enums.HTTP_CODES.DUPLICATE_VALUE)
      .json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  get10Users,
  getUser,
  updateUser,
  deleteUser
};
