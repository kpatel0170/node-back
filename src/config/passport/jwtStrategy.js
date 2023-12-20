const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../../models/user");
const config = require("../config");

const secretOrKey = config.jwt.secret;

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey
  },
  async (payload, done) => {
    try {
      const user = await User.findOne({ email: payload.email });

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = (passport) => {
  passport.use(jwtLogin);
};
