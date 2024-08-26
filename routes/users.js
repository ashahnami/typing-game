const express = require('express');
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('my profile');
});

router.get('/new', (req, res) => {
  res.send('New user form')
})

router.get

module.exports = router;
