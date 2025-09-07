var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/create', function(req, res, next) {
    res.send('Creating a room');
});

module.exports = router;
