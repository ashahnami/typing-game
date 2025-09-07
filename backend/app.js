var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
const redis = require('redis')
const RedisStore = require('connect-redis').RedisStore;

var client = redis.createClient({
    url: 'redis://localhost:6379'
});

client.connect().then(r => console.log(r));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lobbiesRouter = require('./routes/lobbies');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new RedisStore({
        client: client,
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.authenticate('session'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lobbies', lobbiesRouter);
app.use('/auth', authRouter);

module.exports = app;
