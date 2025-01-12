var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('OK')
});

router.get('/quote', function(req, res, next) {
  res.send('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada est suscipit maximus scelerisque. Vivamus posuere pulvinar bibendum. Aenean vitae ante at quam aliquam ornare. Curabitur auctor sit amet nunc nec porttitor. Phasellus erat dolor, scelerisque sit amet magna sit amet, tempor pulvinar eros.')
});

module.exports = router;
