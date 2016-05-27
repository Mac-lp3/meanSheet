'use strict';

const express = require('express');
const testData = require('../test/datastore/testData');
const Task = require('../model/task');
const moment = require('moment');
const async = require('async');
const router = express.Router();

/* index URL. */
router.get('/', function(req, res, next) {

	// check if a query has been provided
	const queryString = req.query.q;

    let leave = [{'code' : 'PTO'}, {'code' : 'JURY'}, {'code' : 'SICK'}];

    res.json(leave);
    
});

/* individual task. */
router.get('/:leaveId', function(req, res, next) {

	const taskCode = req.params.taskCode;
    
    Task.findOne({code : taskCode}, function (err, task){

        if (err)
            console.log(err);

        console.log('looking for: ' + myRe);
        res.json(task);
    });

});

module.exports = router;