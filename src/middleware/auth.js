const passport = require('passport');

function jwtAuthentication(req, res, next) {
  return passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({
          STATUS: 'FAILURE',
          MESSAGE: 'Unauthenticated (JWT)',
          CODE: 401,
        });
      }
      req.user = user;
      next();
    },
  )(req, res, next);
}

function googleAuthentication(req, res, next) {
  return passport.authenticate(
    'google',
    {
      session: false,
    },

    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({
          STATUS: 'FAILURE',
          MESSAGE: 'Unauthenticated (Google)',
          CODE: 401,
        });
      }
      req.user = user;
      next();
    },
  )(req, res, next);
}

module.exports = {
  jwtAuthentication,
  googleAuthentication,
};
