require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./logger');

const connect = async (isProduction) => {
  // DB Config
  const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;
  try {
    await mongoose.connect(dbConnection);
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
};

module.exports = connect;
