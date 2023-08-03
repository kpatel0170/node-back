const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const User = require('../models/user');

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne(
        {
          email: jwt_payload.email,
        },
        (err, user) => {
          if (err) return done(err, false);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        },
      );
    }),
  );
};
