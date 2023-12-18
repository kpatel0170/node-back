import passport from "passport";
// eslint-disable-next-line
import * as enums from "../json/enums.json" assert { type: "json" };
import * as messages from "../json/messages.json" assert { type: "json" };

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
          .send({ message: messages.AUTH_MESSAGES.UNAUTHENTICATED });
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
          .send({ message: messages.AUTH_MESSAGES.UNAUTHENTICATED });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
}

export default {
  jwtAuthentication,
  googleAuthentication
};
