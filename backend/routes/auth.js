var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/auth/oauth2/redirect/google',
    scope: ['profile']
},
    function(accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
        return cb(null, profile);
    }))

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('OK')
});

router.get('/login',
    passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/login'
}));

router.get('/status', (req, res) => {
    if (req.user) return res.send(req.user)
    else res.sendStatus(401);
})

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('http://localhost:5173/');
    });
});

module.exports = router;
