const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(128).messages({
      "string.min": "Password must contain at least 8 characters",
      "string.max": "Password must contain at most 128 characters"
    })
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(128).messages({
      "string.min": "Password must contain at least 8 characters",
      "string.max": "Password must contain at most 128 characters"
    })
  })
};

module.exports = {
  register,
  login
};
