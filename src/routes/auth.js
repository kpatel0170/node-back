const express = require('express');
const authController = require('../controller/auth');
const authValidation = require('../validation/auth');
const validate = require('../middleware/validate');

const authRouter = express.Router();

authRouter.post('/register', validate(authValidation.register), authController.registerUser);

module.exports = authRouter;
