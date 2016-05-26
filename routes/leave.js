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

    res.sendStatus(200);
    
});

/* individual task. */
router.get('/:leaveId', function(req, res, next) {

	var taskCode = req.params.taskCode;
    
    Task.findOne({code : taskCode}, function (err, task){

        if (err)
            console.log(err);

        console.log('looking for: ' + myRe);
        res.json(task);
    });

});

module.exports = router;