const { version } = require("../../package.json");
const config = require("../config/config");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "node-back API",
    version,
    description: "API Documentation"
  },
  servers: [
    {
      url: config.siteUrls.serverURL
    }
  ]
};

module.exports = swaggerDefinition;
