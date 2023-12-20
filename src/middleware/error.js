const mongoose = require("mongoose");
const config = require("../config/config");
const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");
const enums = require("../json/enums.json");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? enums.HTTP_CODES.BAD_REQUEST
        : enums.HTTP_CODES.INTERNAL_SERVER_ERROR;
    const message = error.message || enums.HTTP_CODES[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode || !message) {
    statusCode = enums.HTTP_CODES.INTERNAL_SERVER_ERROR;
    message = enums.HTTP_CODES[enums.HTTP_CODES.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack })
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler
};
