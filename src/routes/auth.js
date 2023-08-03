const express = require('express');
const authController = require('../controller/auth');
const authValidation = require('../validation/auth');
const validate = require('../middleware/validate');
const { callGoogleAuth, callBackGoogle } = require('../controller/auth');
const googleConfig = require('../config/googleConfig');

const authRouter = express.Router();

authRouter.post('/register', validate(authValidation.register), authController.registerUser);
authRouter.post('/login', validate(authValidation.login), authController.loginUser);

// Api call back function
authRouter.get('/google/callback', googleConfig.authenticate('google', { failureRedirect: '/error' }), function (req, res) {
  res.redirect('/success');
});

authRouter.get('/google', googleConfig.authenticate('google', { scope: ['profile', 'email'] }), function (req, res) {});

module.exports = authRouter;
