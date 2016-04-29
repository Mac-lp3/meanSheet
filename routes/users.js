var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('tryna sign up');
});

module.exports = router;
