const passport = require("passport");
const enums = require("../json/enums.json");
const messages = require("../json/messages.json");

function jwtAuthentication(req, res, next) {
  return passport.authenticate(
    "jwt",
    {
      session: false
    },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(enums.HTTP_CODES.UNAUTHORIZED)
          .send({ error: messages.AUTH_MESSAGES.UNAUTHENTICATED });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
}

function googleAuthentication(req, res, next) {
  return passport.authenticate(
    "google",
    {
      session: false
    },

    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(enums.HTTP_CODES.UNAUTHORIZED)
          .send({ error: messages.AUTH_MESSAGES.UNAUTHENTICATED });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
}

module.exports = {
  jwtAuthentication,
  googleAuthentication
};
