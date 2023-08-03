const moment = require('moment-timezone');
const authService = require('../service/auth');
const logger = require('../config/logger');

const RefreshToken = require('../models/refreshToken');

function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add('2', 'hours');
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, password',
      });
    }

    const user = await authService.createUser(name, email, password);
    return res.status(201).json({ status: true, data: user });
  } catch (error) {
    logger.error(error.message);
    return res.status(409).json({ status: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, password',
      });
    }

    const user = await authService.loginUser(email, password);
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    logger.error(error.message);
    return res.status(409).json({ status: false, error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
