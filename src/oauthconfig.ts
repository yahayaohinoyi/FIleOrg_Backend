import { error } from 'console';
import { Strategy } from 'passport-google-oauth2';
const passport = require('passport');

const googleStrategy = new Strategy(
  {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    passReqToCallback: true,
  },
  function (request, accessToken, refreshToken, profile, done) {
    return done(error, profile);
  },
);
passport.use(googleStrategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// export default googleStrategy;
