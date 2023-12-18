const Joi = require("joi");
const User = require("../models/user");

module.exports = {
  // GET /api/profile
  get10Users: {
    query: {
      limit: Joi.number().integer(),
      skip: Joi.number().integer()
    }
  },

  // GET /api/profile
  getUser: {
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PUT /api/profile
  updateUser: {
    body: {
      email: Joi.string().email(),
      password: Joi.string().min(8).max(128),
      name: Joi.string().max(128)
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // DELETE /api/profile
  deleteUser: {
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
