require('dotenv').config();
const https = require('https'); // Import the 'https' module
const { readFileSync } = require('fs'); // Import the 'readFileSync' method from 'fs'

const app = require('./app');
const connectDB = require('./config/connect');
const logger = require('./config/logger');

let server; // Declare 'server' variable globally to access it outside the scope
const isProduction = process.env.NODE_ENV === 'production';

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

      const port = process.env.PORT || 80;
      app.listen(port, () => logger.info(`Server started on port ${port}`));
    } else {
      const port = process.env.PORT || 5000;

      // const httpsOptions = {
      //   key: readFileSync(resolve(__dirname, '../security/cert.key')),
      //   cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
      // };

      server = app.listen(port, () => {
        logger.info(`HTTPS server running at ${port}`);
        // import all_routes from 'express-list-endpoints';
        // console.log(all_routes(app));
      });
    }
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
