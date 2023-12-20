require("dotenv").config();
const https = require("https"); // Import the 'https' module
const { readFileSync } = require("fs"); // Import the 'readFileSync' method from 'fs'

const app = require("./app");
const connectDB = require("./config/connectDB");
const logger = require("./config/logger");
const config = require("./config/config");

let server; // Declare 'server' variable globally to access it outside the scope
const isProduction = config.env === "production";

// Connect to MongoDB and start the server
connectDB(isProduction)
  .then(() => {
    if (isProduction) {
      // Serve static assets if in production
      // Set static folder (if needed)
      // app.use(express.static(join(__dirname, '../../client/build')));

      // app.get('*', (req, res) => {
      //   res.sendFile(resolve(__dirname, '../..', 'client', 'build', 'index.html'));
      // });
      app.listen(config.port, () =>
        logger.info(`Server started on port ${config.port}`)
      );
    } else {
      // const httpsOptions = {
      //   key: readFileSync(resolve(__dirname, '../security/cert.key')),
      //   cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
      // };

      server = app.listen(config.port, () => {
        logger.info(`HTTPS server running at ${config.port}`);
        // import all_routes from 'express-list-endpoints';
        // console.log(all_routes(app));
      });
    }
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(`Error: ${error}`);
  exitHandler();
};

// Handle unhandled promise rejections
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
