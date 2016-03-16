// Grab stuff we need
var express = require('express');
var router = express.Router();

// mongoose models
var TimeSheet = require('../model/timeSheet');
var LineItem = require('../model/lineItem');
var User = require('../model/user');
var Task = require('../model/task');
var Project = require('../model/project');

/* Build test users */
var user1 = new User();
user1.username = "Jmoney";
user1.password = "slippyfist";
user1.email = "slipster@lol.gov";
user1.department = "LOL";

var user2 = new User();
user2.username = "Big$C";
user2.password = "311insidejob";
user2.email = "dollaz@IDK.gov";
user2.department = "IDK";

var user3 = new User();
user3.username = "dave";
user3.password = "badtouch";
user3.email = "serialz@wut.gov";
user3.department = "WUT";

var user4 = new User();
user4.username = "jizanthripus";
user4.password = "abc123";
user4.email = "gondo@idk.gov";
user4.department = "IDK";

const testUsers = [user1, user2, user3, user4];

/* set up test work items */
var project1 = new Project();
project1.code = "p0001";
project1.name = "idk sum proj";
project1.description = "woooooooooooooooooooooooooooooowwww";
project1.author = user1.username;
project1.owner = user2.username;

var task1 = new Task();
task1.code = "t01";
task1.author = user3.username;
task1.name = "dat task";
task1.description = "a task assigned to a project.";
task1.owner = user4.username;
task1.projectCode = "p0002";

var project2 = new Project();
project2.code = "p0002";
project2.name = "proj wid task";
project2.description = "okokokokokoookokokokok";
project2.taskCodes.push(task1.code);
project2.author = user3.username;
project2.owner = user4.username;

var task2 = new Task();
task2.code = "t02";
task2.author = user1.username;
task2.name = "another task";
task2.description = "a simple task.";
task2.owner = user2.username;

const testProjects = [project1, project2];
const testTasks = [task1, task2];

/* GET home page. */
router.get('/workItems', function(req, res, next) {

    // TODO iterate through projects/tasks
    for (i = 0; i < testProjects.length; ++i) {
        // TODO check if work item exists in DB
        // TODO if no, save, if yes, skip
    }
    for (i = 0; i < testTasks.length; ++i) {
       // TODO check if work item exists in DB
       // TODO if no, save, if yes, skip
    }
 
    res.json({'resource' : 'work items', 'message' : 'A-OKAY'});
});
 
/* GET home page. */
router.get('/timeSheets', function(req, res, next) {
    
    /* build test time sheets */
    var timeSheet1 = new TimeSheet();
    timeSheet1.username = user1.username;
    timeSheet1.sundayDate = new Date();

    var lineItem1 = new LineItem.LineItemModel();
    lineItem1.workItemCode = task2.code;
    lineItem1.username = user1.username;
    lineItem1.sundayDate = timeSheet1.sundayDate;
    lineItem1.mondayHours = 3;
    lineItem1.tuesdayHours = 4;
    lineItem1.wednesdayHours = 5;
    lineItem1.thursdayHours = 6;
    lineItem1.fridayHours = 8;

    var lineItem2 = new LineItem.LineItemModel();
    lineItem2.workItemCode = project1.code;
    lineItem2.username = user1.username;
    lineItem2.sundayDate = timeSheet1.sundayDate;
    lineItem2.mondayHours = 9;
    lineItem2.tuesdayHours = 2;
    lineItem2.wednesdayHours = 7;
    lineItem2.thursdayHours = 2;
    lineItem2.fridayHours = 5;

    timeSheet1.lineItems.push(lineItem1);
    timeSheet1.lineItems.push(lineItem2);

    /* build test time sheets */
    var timeSheet2 = new TimeSheet();
    timeSheet2.username = user1.username;
    timeSheet2.sundayDate = new Date();

    var lineItem3 = new LineItem.LineItemModel();
    lineItem3.workItemCode = task1.code;
    lineItem3.username = user3.username;
    lineItem3.sundayDate = timeSheet2.sundayDate;
    lineItem3.mondayHours = 3;
    lineItem3.tuesdayHours = 4;
    lineItem3.wednesdayHours = 5;
    lineItem3.thursdayHours = 6;
    lineItem3.fridayHours = 8;

    timeSheet2.lineItems.push(lineItem3);
 
    res.json([timeSheet1, timeSheet2]);
});
 
router.get('/users', function(req, res, next) {
    
    for (i = 0; i < userData.length; ++i) {
        // TODO for each user, make sure they exisit in DB.
        // TODO if not, save them, else move on
        userData[i];
    }

    // Return A-OKAY, not data
    res.json(testUsers);
});
 
module.exports = router;