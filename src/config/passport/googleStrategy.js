// eslint-disable-next-line import/no-extraneous-dependencies
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const logger = require("../logger");
const config = require("../config");

const User = require("../../models/user");

const googleLogin = new GoogleStrategy(
  {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: `${config.siteUrls.server}${config.google.callbackURL}`,
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    try {
      const oldUser = await User.findOne({ email: profile.email });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      logger.error(err);
      return done(err, null);
    }

    try {
      const newUser = await new User({
        googleId: profile.id,
        email: profile.email,
        name: profile.displayName
      }).save();
      done(null, newUser);
    } catch (err) {
      logger.error(err);
      done(err, null);
    }
  }
);

module.exports = (passport) => {
  passport.use(googleLogin);
};
