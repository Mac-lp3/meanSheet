var express = require('express');
var path = require('path');
var router = express.Router();

/* GET dash page. */
router.get('/login', function(req, res, next) {

    // TODO environment variables to send proper home page 
    // TODO streams / piping

    res.sendFile(path.join(__dirname, '/../public/html/login-dev.html'));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET dash page. */
router.get('/dash', function(req, res, next) {
  	res.sendFile(path.join(__dirname, '/../public/html/index.html'));
});

module.exports = router;
