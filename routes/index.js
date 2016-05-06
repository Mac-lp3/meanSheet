'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET login page. */
router.get('/login', function(req, res, next) {
    
    let stream = '';

    if (process.env.NODE_ENV === 'development') {
        stream = fs.createReadStream(__dirname + '/../public/html/login-dev.html');
    } else {
        stream = fs.createReadStream(__dirname + '/../public/html/login.html');
    }

    stream.pipe(res);

});

/* POST login form. */
router.post('/login', function(req, res, next) {

    const email = req.body.emailAddress;
    console.log(email);

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET dash page. */
router.get('/dash', function(req, res, next) {

	let stream = fs.createReadStream(__dirname + '/../public/html/index.html');

  	stream.pipe(res);

});

module.exports = router;
