import Joi from "joi";
import * as messages from "../json/messages.json" assert { type: "json" };

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(8)
      .max(128)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .label("Password")
      .error(new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number'))
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(8)
      .max(128)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .error(new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number'))
  })
};

const passwordReset = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(8)
      .max(128)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .error(new Error())
      .label("Password"),
    token: Joi.string().required()
  })
};

const passwordResetRequest = {
  body: Joi.object().keys({
    email: Joi.string().required().email()
  })
};

const authValidation = {
  register,
  login,
  passwordReset,
  passwordResetRequest
};

export default authValidation;
