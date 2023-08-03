/* eslint-disable import/no-extraneous-dependencies */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { v4: uuidv4 } = require('uuid');

const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/user');

async function extractProfile(profile) {
  const userData = {
    googleId: profile._json.sub,
    name: profile._json.name,
    email: profile._json.email,
    password: uuidv4(),
  };
  const oldUser = await User.findOne({ googleId: userData.googleId });

  if (oldUser) return null;

  await User.create(userData);
  return userData;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      accessType: 'offline',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, extractProfile(profile));
    },
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
