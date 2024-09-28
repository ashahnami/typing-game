var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
require('dotenv').config()   
require('./auth');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'temp_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

// app.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next(0);
// });

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.use('/auth', authRouter);
app.use('/users', usersRouter);

module.exports = app;
