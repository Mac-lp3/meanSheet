var express = require('express');
var testData = require('../test/datastore/testData');
var moment = require('moment');
var async = require('async');
var Project = require('../model/project');
var router = express.Router();

router.post('/login', function(req, res, next) {
	console.log('tryna sign in');
});

module.exports = router;