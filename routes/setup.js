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
    
    // Return A-OKAY, not data
    res.json(testData.testUsers);
});
 
module.exports = router;