require("dotenv").config();

// eslint-disable-next-line import/no-extraneous-dependencies
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const logger = require("../logger");

const User = require("../../models/user");

// eslint-disable-next-line operator-linebreak
const serverUrl =
  process.env.NODE_ENV === "production"
    ? process.env.SERVER_URL_PROD
    : process.env.SERVER_URL_DEV;

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverUrl}${process.env.GOOGLE_CALLBACK_URL}`,
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
