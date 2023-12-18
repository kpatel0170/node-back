const moment = require("moment-timezone");
const authService = require("../service/auth");
const logger = require("../config/logger");
const enums = require("../json/enums.json");
const messages = require("../json/messages.json");

// const RefreshToken = require('../models/refreshToken');

// function generateTokenResponse(user, accessToken) {
//   const tokenType = 'Bearer';
//   const refreshToken = RefreshToken.generate(user).token;
//   const expiresIn = moment().add('2', 'hours');
//   return {
//     tokenType,
//     accessToken,
//     refreshToken,
//     expiresIn,
//   };
// }

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(enums.HTTP_CODES.BAD_REQUEST)
        .json({ message: messages.AUTH_MESSAGES.FILL_DETAILS });
    }

    const user = await authService.createUser(name, email, password);
    return res
      .status(enums.HTTP_CODES.OK)
      .json({ message: messages.AUTH_MESSAGES.REGISTER_SUCCESS, data: user });
  } catch (error) {
    logger.error(error.message);
    return res
      .status(enums.HTTP_CODES.DUPLICATE_VALUE)
      .json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(enums.HTTP_CODES.BAD_REQUEST)
        .json({ message: messages.AUTH_MESSAGES.FILL_DETAILS });
    }

    const user = await authService.loginUser(email, password);
    return res
      .status(enums.HTTP_CODES.OK)
      .json({ message: messages.AUTH_MESSAGES.LOGIN_SUCCESS, data: user });
  } catch (error) {
    logger.error(error.message);
    return res
      .status(enums.HTTP_CODES.DUPLICATE_VALUE)
      .json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};
