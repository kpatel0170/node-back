import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '#config';
import User from '#models/user';

const jwtOptions = {
  secretOrKey: config.auth.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

async function jwtHandler(payload, done) {
  try {
    const user = await User.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}

function oAuthHandler(service) {
  return async (token, done) => {
    try {
      const userData = await authProviders[service](token);
      const user = await User.oAuthLogin(userData);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };
}

const authMiddleware = passport.initialize();

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: config.auth.google.callbackURL,
      passReqToCallback: true,
    },
    oAuthHandler('google')
  )
);

passport.use('jwt', new JwtStrategy(jwtOptions, jwtHandler));

export default authMiddleware;
