/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../../package.json");

const router = express.Router();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "node-back API",
    version,
    description: "API Documentation"
  },
  servers: [
    {
      url: "http://localhost:3001/api/docs"
    }
  ]
};

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["src/docs/swagger/*.yml"]
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

module.exports = router;
