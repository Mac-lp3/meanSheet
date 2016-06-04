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
router.post('/auth', function(req, res, next) {
    
    console.log('tryna get at them tokens');

    const emailAddress = req.body.emailAddress;

    User.findOne({ 'emailAddress': emailAddress } , function(err, user){
        
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        console.log('================================');
        console.log('********************************');
        if (err) {
            res.status(401).json({ success: false, message: 'An error occurred durring authentication.' })
        }

        if (user) {

            user.comparePassword(function(err, isMatch) { 

                if(err){
                    console.log(err);
                    res.status(401).json({ success: false, message: 'An error occurred durring authentication.' })
                } else if (isMatch) {

                    res.status(200).json({ 'emailAddress': emailAddress });
                } else {
                    
                    res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' })
                }

            });

        } else {
            // user was not found
            console.log("look man... idk");
            res.sendStatus(403);
        }

    });

});

module.exports = router;