var express = require('express');
var db = require('../db');
var mysql = require('mysql');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const username = req.body.username;
    // const username = 'armin';
    console.log(typeof username)
    const password = req.body.password;
    
    var sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) throw err;

        if (result && result.length > 0) {
            console.log(result);
            if (password === result[0].password) {
                const user = { username: result[0].username }
                const accessToken = jwt.sign(user, 'SECRET_KEY');
                res.json({ accessToken: accessToken })
            } else {
                return res.sendStatus(401);
            }
        } else {
            console.log('no results')
            return res.sendStatus(401);
        }
    })
})

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    var sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, result, fields) => {
        if (err) throw err;

        if (result && result.length > 0) {
            console.log("Username already exists");
        } else {
            var sql = "INSERT INTO users (username, password) VALUES (?, ?)";
            db.query(sql, [username, password], (err, result, fields) => {
                if (err) throw err;
                res.redirect('/login')
            });
        }
    });
})

router.post('/logout', (req, res) => {
    return res.sendStatus(200);
})

module.exports = router