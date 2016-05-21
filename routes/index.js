'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../model/user');
const fs = require('fs');

/* GET login page. */
router.get('/login', function(req, res, next) {
    
    let stream = '';

    if (process.env.NODE_ENV === 'development') {
        stream = fs.createReadStream(__dirname + '/../public/html/login/login-dev.html');
    } else {
        stream = fs.createReadStream(__dirname + '/../public/html/login/login.html');
    }

    stream.pipe(res);

});

/* POST login form. */
router.post('/login', function(req, res, next) {

    console.log('tryna sign in');

    const emailAddress = req.body.emailAddress;

    User.findOne({ 'email': emailAddress } , function(err, user){
        
        if (err) {
            // TODO
        }

        if (user) {
            res.status(200).json({ 'emailAddress': emailAddress });
        } else {
            res.sendStatus(403);
        }

    });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  
    let stream = fs.createReadStream(__dirname + '/../public/app/template.html');

    stream.pipe(res);

});

/* GET dash page. */
router.get('/dash', function(req, res, next) {

	let stream = fs.createReadStream(__dirname + '/../public/html/index.html');

  	stream.pipe(res);

});

module.exports = router;
