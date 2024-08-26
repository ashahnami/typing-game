const express = require('express')
const connection = require('./../connection.js')
const router = express.Router()

router.post('/login', (req, res) => {
    var username = req.body.username
    var sql = 'SELECT * FROM users WHERE username = ' + mysql.escape(username);

})

router.post('/register', (req, res) => {

})

router.get('/signout', (req, res) => {
    res.redirect('/login');
})

module.exports = router