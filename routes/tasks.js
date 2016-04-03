var express = require('express');
var testData = require('../test/datastore/testData');
var Task = require('../model/task');
var moment = require('moment');
var async = require('async');
var router = express.Router();

/* index URL. */
router.get('/', function(req, res, next) {

	// check if a query has been provided
	var queryString = req.query.q;

	if (queryString) {

		console.log('querying tasks: ' + queryString);

	    var myRe = new RegExp(queryString);
	    
	    Task.find({ $or : [{code : myRe}, {author : myRe}, {creator : myRe}, {description : myRe}] }, 
	    	function (err, tasks){

	        if (err)
	            console.log(err);

	        console.log('looking for: ' + myRe);
	        res.json(tasks);
	    });

    } else {

    	console.log('grabbing all tasks...');

    	// TODO what do I look for? how much to limit?
    	Task.find(
    		{},
    		function(err, tasks){

    			if (err)
    				console.log('err');

    			res.json(tasks);
    		}
    	).limit(25);
    }
    //TODO what about when no params sent? just get everything? some subset?
});

/* get work items page. */
router.get('/:taskCode', function(req, res, next) {

	var taskCode = req.params.taskCode;
    
    Task.findOne({code : taskCode}, function (err, task){

        if (err)
            console.log(err);

        console.log('looking for: ' + myRe);
        res.json(task);
    });

});

module.exports = router;