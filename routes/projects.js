var express = require('express');
var testData = require('../test/datastore/testData');
var moment = require('moment');
var async = require('async');
var Project = require('../model/project');
var router = express.Router();

/* get work items page. */
router.get('/', function(req, res, next) {

  // check if a query has been provided
	var queryString = req.query.q;

	if (queryString) {

		console.log('querying projects: ' + queryString);

	    var myRe = new RegExp(queryString);
	    
	    Project.find({ $or : [{code : myRe}, {author : myRe}, {creator : myRe}, {description : myRe}] }, 
	    	function (err, projects){
	    		// TODO what do???
	        	if (err)
	            	console.log(err);

	            // TODO how log??
	        	console.log('looking for: ' + myRe);
	        	res.json(projects);
	    	}
	    );
    } else {

    	console.log('grabbing all projects...');

    	// TODO what do I look for? how much to limit?
    	Project.find(
    		{},
    		function(err, projects){

    			// TODO what do??
    			if (err)
    				console.log('err');

    			res.json(projects);
    		}
    	).limit(25);
    }
});

/* get work items page. */
router.get('/:projectCode', function(req, res, next) {

	var projectCode = req.params.projectCode;
    
    Project.findOne({code : projectCode}, function (err, project){

        if (err)
            console.log(err);

        console.log('looking for: ' + myRe);
        res.json(project);
    });

});

module.exports = router;