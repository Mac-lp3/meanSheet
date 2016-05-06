var express = require('express');
var path = require('path');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {

    // TODO environment variables to send proper home page 
    // TODO streams / piping

    res.sendFile(path.join(__dirname, '/../public/html/login-dev.html'));
});

/* POST login form. */
router.post('/login', function(req, res, next) {

    // res.sendFile(path.join(__dirname, '/../public/html/login-dev.html'));
    const email = req.body.emailAddress;
    console.log(email);
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
