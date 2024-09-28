var express = require('express');
var db = require('../db');
var mysql = require('mysql');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { 
    successRedirect: 'http://localhost:5173/',
    failureRedirect: 'http://localhost:5173/login',
  }));

router.post('/logout', function(req, res, next) {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    })
})

module.exports = router