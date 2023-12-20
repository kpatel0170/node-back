const authService = require("../service/authService");
const userService = require("../service/userService");
const tokenService = require("../service/tokenService");
const emailService = require("../service/emailService");
const enums = require("../json/enums.json");
const messages = require("../json/messages.json");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  return res
    .status(enums.HTTP_CODES.OK)
    .json({ message: messages.AUTH_MESSAGES.REGISTER_SUCCESS, user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  return res
    .status(enums.HTTP_CODES.OK)
    .json({ message: messages.AUTH_MESSAGES.LOGIN_SUCCESS, user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(enums.HTTP_CODES.NO_CONTENT_FOUND).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(enums.HTTP_CODES.NO_CONTENT_FOUND).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(enums.HTTP_CODES.NO_CONTENT_FOUND).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(enums.HTTP_CODES.NO_CONTENT_FOUND).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(enums.HTTP_CODES.NO_CONTENT_FOUND).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};
