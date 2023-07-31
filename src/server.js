const dotenv = require('dotenv');
const app = require('./app');
const connect = require('./config/connect');
const logger = require('./config/logger');

dotenv.config();

const port = process.env.PORT;

let server;

// Connect to MongoDB and start the server
connect()
  .then(() => {
    server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });