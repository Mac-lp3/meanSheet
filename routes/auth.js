var express = require('express');
var testData = require('../test/datastore/testData');
var User = require('../model/user');
var moment = require('moment');
var router = express.Router();

router.post('/login', function(req, res, next) {
    
    console.log('tryna sign in');

    const emailAddress = req.body.emailAddress;

    Person.findOne({ 'email': emailAddress } , function(err, user){
        
        if (err) {
            // TODO
        }

        if (user) {
            res.status(200).json({ 'emailAddress': emailAddress });
        } else {
        	res.status(403);
        }

    });

});

module.exports = router;