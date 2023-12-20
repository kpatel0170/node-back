const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email(),
    password: Joi.string()
      .label("Password")
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/, "password")
      .message({
        "string.base": "'{{#label}}' must be a string",
        "string.min": "'{{#label}}' must be at least 8 characters",
        "string.max": "'{{#label}}' must contain at most 128 characters",
        "string.pattern.name": "password",
        "string.pattern.base":
          "'{{#label}}' must contain at least 1 letter and 1 number"
      })
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string()
      .label("Password")
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/, "password")
      .message({
        "string.base": "'{{#label}}' must be a string",
        "string.min": "'{{#label}}' must be at least 8 characters",
        "string.max": "'{{#label}}' must contain at most 128 characters",
        "string.pattern.name": "password",
        "string.pattern.base":
          "'{{#label}}' must contain at least 1 letter and 1 number"
      })
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: Joi.string()
      .label("Password")
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/, "password")
      .message({
        "string.base": "'{{#label}}' must be a string",
        "string.min": "'{{#label}}' must be at least 8 characters",
        "string.max": "'{{#label}}' must contain at most 128 characters",
        "string.pattern.name": "password",
        "string.pattern.base":
          "'{{#label}}' must contain at least 1 letter and 1 number"
      })
  })
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required()
  })
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail
};
