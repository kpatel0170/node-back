const Joi = require("joi");
const User = require("../models/user");

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message("'{{#label}}' must be a valid mongo id");
        }
        return value;
      })
  })
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message("'{{#label}}' must be a valid mongo id");
        }
        return value;
      })
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
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
        }),
      name: Joi.string()
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message("'{{#label}}' must be a valid mongo id");
        }
        return value;
      })
  })
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
