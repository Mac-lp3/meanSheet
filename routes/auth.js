'use strict';

const express = require('express');
const testData = require('../test/datastore/testData');
const User = require('../model/user');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const router = express.Router();

/*
 * Post a form - get your token
 */
router.post('/', function(req, res, next) {
    
    console.log('tryna get at them tokens');

    const emailAddress = req.body.emailAddress;
    const password = req.body.password;

    User.findOne({ 'emailAddress': emailAddress } , function(err, user){
        
        if (err) {
            res.status(401).json({ success: false, message: 'An error occurred durring authentication.' })
        }

        if (user) {

            user.comparePassword(password, function(err, isMatch) {

                if(err){

                    console.log(err);
                    res.status(401).json({ success: false, message: 'An error occurred durring authentication.' })

                } else if (isMatch) {

                    const token = jwt.sign({role : 'T1', department : user.department}, process.env.SIGN_SECRET, {
                        expiresIn: '24h' // expires in 24 hours
                    });

                    res.status(200).json({ success: true, 'token':  token});
                } else {
                    
                    res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' })
                }

            });

        } else {
            // user was not found
            console.log("User was not found");
            res.status(401).json({ success: false, message: 'Authentication failed. User does not exist.' })
        }

    });

});

module.exports = router;