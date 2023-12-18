import passport from "passport";
import express from "express";
import authController from "../controller/auth.js";
import authValidation from "../validation/auth.js";
import validate from "../middleware/validate.js";
import authMiddleware from "../middleware/auth.js";

const authRouter = express.Router();

/**
 * @api {post} v1/auth/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}          email     User's email
 * @apiParam  {String{6..128}}  password  User's password
 *
 * @apiSuccess (Created 201) {String}  token.tokenType     Access Token's type
 * @apiSuccess (Created 201) {String}  token.accessToken   Authorization Token
 * @apiSuccess (Created 201) {String}  token.refreshToken  Token to get a new accessToken
 *                                                   after expiration time
 * @apiSuccess (Created 201) {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 * @apiSuccess (Created 201) {String}  token.timezone      The server's Timezone
 *
 * @apiSuccess (Created 201) {String}  user.id         User's id
 * @apiSuccess (Created 201) {String}  user.name       User's name
 * @apiSuccess (Created 201) {String}  user.email      User's email
 * @apiSuccess (Created 201) {String}  user.role       User's role
 * @apiSuccess (Created 201) {Date}    user.createdAt  Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
authRouter.post(
  "/register",
  validate(authValidation.register),
  authMiddleware.jwtAuthentication,
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

authRouter.post(
  "/forgot-password",
  validate(authValidation.passwordReset),
  authController.resetPassword
);
authRouter.post(
  "/reset-password",
  validate(authValidation.passwordResetRequest),
  authController.resetPasswordRequest
);

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
// eslint-disable-next-line operator-linebreak
// const clientUrl =
//   process.env.NODE_ENV === "production"
//     ? process.env.CLIENT_URL_PROD
//     : process.env.CLIENT_URL_DEV;

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

export default authRouter;
