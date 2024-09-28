const express = require('express');
const router = express.Router()

router.get('/', function(req, res) {
  res.send({ username: req.user.name, email: req.user.email })
});

module.exports = router;
