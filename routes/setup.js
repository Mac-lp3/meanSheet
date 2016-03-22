/* grab server stuff */
var express = require('express');
var router = express.Router();

/* grab models */
var TimeSheet = require('../model/timeSheet');
var LineItem = require('../model/lineItem');
var User = require('../model/user');
var Task = require('../model/task');
var Project = require('../model/project');
var testData = require('../test/datastore/testData');

/* GET home page. */
router.get('/workItems', function(req, res, next) {
    
    res.json([testData.testTasks, testData.testProjects]);
});
 
/* GET home page. */
router.get('/timeSheets', function(req, res, next) {
    
    res.json(testData.testTimeSheets);
});
 
router.get('/users', function(req, res, next) {

    var userCount = 0;

    // iterate over each test user
    for (i = 0; i < testData.testUsers.length; ++i) {

        // get a count of users with this user name
        User.count({username: testData.testUsers[i].username}, function (err, count){ 
            userCount = count 
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