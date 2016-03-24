/* grab server stuff */
var express = require('express');
var router = express.Router();
var async = require('async');

/* grab models */
var TimeSheet = require('../model/timeSheet');
var LineItem = require('../model/lineItem');
var User = require('../model/user');
var Task = require('../model/task');
var Project = require('../model/project');
var testData = require('../test/datastore/testData');

/* GET home page. */
router.get('/workItems', function(req, res, next) {


    // need to use async
    async.each(testData.testTasks, function(task, callback) {

        // count tasks with this code
        Task.count({code: task.code}, function (err, count){ 

            // make sure count is 0
            if (count == 0) {

                // save this task if so
                task.save(function (err) {
                    if (err) console.log(err);
                });
            }
        });

    }, function (err){
        if (err) console.log(err);
    });

    // need to use async
    async.each(testData.testProjects, function(project, callback) {

        // count tasks with this code
        Project.count({code: project.code}, function (err, count){ 

            // make sure count is 0
            if (count == 0) {

                // save this task if so
                project.save(function (err) {
                    if (err) console.log(err);
                });
            }
        });

    }, function (err){
        if (err) console.log(err);
    });
    
    res.json([testData.testTasks, testData.testProjects]);
});
 
/* GET home page. */
router.get('/timeSheets', function(req, res, next) {

    // need to use asynch here
    async.each(testData.testTimeSheets, function(timeSheet, callback) {

        // count time sheets by this user for this date
        TimeSheet.count({ $and: [{username: timeSheet.username}, 
            {sundayDate: timeSheet.sundayDate}]}, function (err, count){ 

            // make sure no time sheets by this user for this date exist
            if (count == 0) {  

                // save if not
                timeSheet.save(function (err) {
                    if (err) console.log(err);
                });
            }
        });

    }, function (err){
        if (err) console.log(err);
    });
    
    res.json(testData.testTimeSheets);
});
 
router.get('/users', function(req, res, next) {

    // need to use async
    async.each(testData.testUsers, function(user, callback) {

        // count users with this user name
        User.count({username: user.username}, function (err, count){ 

            // make sure count is 0
            if (count == 0) {

                // save this user if so
                user.save(function (err) {
                    if (err) console.log(err);
                });
            }

        });

    }, function (err){
        if (err) console.log(err);
    });
    
    // Return A-OKAY, not data
    res.json(testData.testUsers);
});
 
module.exports = router;