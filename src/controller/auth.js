const authService = require('../service/auth');
const logger = require('../config/logger');

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


module.exports = {
  registerUser
};
