var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, cb) => {
    await User.findOrCreate({
      where: { id: profile.id }, 
      defaults: {
        id: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
      }
    })

    return cb(null, {id: profile.id, name: profile.displayName, email: profile.emails[0].value});
  }
));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user);
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});