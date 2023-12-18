require("dotenv").config();
const express = require("express");
const passport = require("passport");
const authController = require("../controller/auth");
const authValidation = require("../validation/auth");
const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validate(authValidation.register),
  authController.registerUser
);
authRouter.post(
  "/login",
  validate(authValidation.login),
  authController.loginUser
);
authRouter.get("/logout", (req, res) => {
  req.logout();
  res.send(false);
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// // Route for initiating Google OAuth authentication for registration
// authRouter.get('/google/register', authMiddleware.googleAuthentication, authController.handleGoogleCallbackForRegistration);

// // Route for initiating Google OAuth authentication for login
// authRouter.get('/google/login', authMiddleware.googleAuthentication, authController.handleGoogleCallbackForLogin);

// Callback route for Google OAuth authentication
const clientUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false
  }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.cookie("x-auth-cookie", token);
    res.redirect("/success");
  }
);

module.exports = authRouter;
