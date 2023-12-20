const userService = require("./userService");
const tokenService = require("./tokenService");
const Token = require("../models/token");
const ApiError = require("../utils/ApiError");
const enums = require("../json/enums.json");
const messages = require("../json/messages.json");

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      enums.HTTP_CODES.UNAUTHORIZED,
      messages.AUTH_MESSAGES.INVALID_CREDENTIALS
    );
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: "refreshToken",
    blacklisted: false
  });
  if (!refreshTokenDoc) {
    throw new ApiError(
      enums.HTTP_CODES.BAD_REQUEST,
      messages.AUTH_MESSAGES.INVALID_TOKEN
    );
  }
  await Token.deleteOne({ _id: refreshTokenDoc._id });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      "refreshToken"
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteOne({ _id: refreshTokenDoc._id });
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(
      enums.HTTP_CODES.UNAUTHORIZED,
      messages.AUTH_MESSAGES.UNAUTHENTICATED
    );
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      "resetPasswordToken"
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: "resetPasswordToken" });
  } catch (error) {
    throw new ApiError(enums.HTTP_CODES.UNAUTHORIZED, "Password reset failed");
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      "verifyEmailToken"
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: "verifyEmailToken" });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(
      enums.HTTP_CODES.UNAUTHORIZED,
      "Email verification failed"
    );
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail
};
