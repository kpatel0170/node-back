/* eslint-disable indent */
const passport = require("passport");
const enums = require("../json/enums.json");
const messages = require("../json/messages.json");
const ApiError = require("../utils/ApiError");

const roleRights = new Map(Object.entries(enums.ROLES));

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(enums.HTTP_CODES.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(enums.HTTP_CODES.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) =>
    new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));

const googleAuthentication = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res
        .status(enums.HTTP_CODES.UNAUTHORIZED)
        .send({ error: messages.AUTH_MESSAGES.UNAUTHENTICATED });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  auth,
  googleAuthentication
};
