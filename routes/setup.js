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

    var workItemCount = 0;

    // iterate over each project
    for (i = 0; i < testData.testProjects.length; ++i) {

        // count time sheets by this user for this date
        Project.count({code: testData.testProjects[i].code}, function (err, count){ 

            workItemCount = count;
        });

        // none found - save 
        if (workItemCount == 0) {
            testData.testProjects[i].save(function (err) {
                if (err) console.log(err);
            });
        }
    }

    // iterate over each task
    for (i = 0; i < testData.testTasks.length; ++i) {

        // count time sheets by this user for this date
        Task.count({code: testData.testTasks[i].code}, function (err, count){ 

            workItemCount = count;

        });

        // none found - save 
        if (workItemCount == 0) {
            testData.testTasks[i].save(function (err) {
                if (err) console.log(err);
            });
        }
    }
    
    res.json([testData.testTasks, testData.testProjects]);
});
 
/* GET home page. */
router.get('/timeSheets', function(req, res, next) {

    var uName = '';
    var sDate = '';

    async.each(testData.testTimeSheets, function(timeSheet, callback) {

        uName = timeSheet.username;
        sDate = timeSheet.sundayDate;

        console.log('got it, right? ' + uName + ', ' + sDate);

        // count time sheets by this user for this date
        TimeSheet.count([{username: uName}, {sundayDate: sDate}], function (err, count){ 

            console.log('count: ' + count);

            if (count == 0) {
                console.log('saving this guy: ' + uName + ', ' + sDate);
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

    var userCount = 0;

    // iterate over each test user
    for (i = 0; i < testData.testUsers.length; ++i) {

        // get a count of users with this user name
        User.count({username: testData.testUsers[i].username}, function (err, count){ 
            userCount = count;
        });

        // none found - save the user
        if (userCount == 0) {
            testData.testUsers[i].save(function (err) {
                if (err) console.log(err);
            });
        }
    }
    
    // Return A-OKAY, not data
    res.json(testData.testUsers);
});
 
module.exports = router;