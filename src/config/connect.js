const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connect = async () => {
  const dbUri = process.env.DB_URI;
  try {
    await mongoose.connect(dbUri);
    console.log('DB connected');
  } catch (error) {
    console.log('Could not connect to db');
    process.exit(1);
  }
};

module.exports = connect;
