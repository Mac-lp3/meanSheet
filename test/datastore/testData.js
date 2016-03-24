/* grab models */
var TimeSheet = require('../../model/timeSheet');
var LineItem = require('../../model/lineItem');
var User = require('../../model/user');
var Task = require('../../model/task');
var Project = require('../../model/project');
var moment = require('moment');

/* Build test users */
var user1 = new User();
user1.username = 'Jmoney';
user1.password = 'slippyfist';
user1.email = 'slipster@lol.gov';
user1.department = 'LOL';

var user2 = new User();
user2.username = 'Big$C';
user2.password = '311insidejob';
user2.email = 'dollaz@IDK.gov';
user2.department = 'IDK';

var user3 = new User();
user3.username = 'dave';
user3.password = 'badtouch';
user3.email = 'serialz@wut.gov';
user3.department = 'WUT';

var user4 = new User();
user4.username = 'jizanthripus';
user4.password = 'abc123';
user4.email = 'gondo@idk.gov';
user4.department = 'IDK';

const testUsers = [user1, user2, user3, user4];

/* build test work items */
var project1 = new Project();
project1.code = 'p0001';
project1.name = 'idk sum proj';
project1.description = 'woooooooooooooooooooooooooooooowwww';
project1.author = user1.username;
project1.owner = user2.username;

var task1 = new Task();
task1.code = 't01';
task1.author = user3.username;
task1.name = 'dat task';
task1.description = 'a task assigned to a project.';
task1.owner = user4.username;
task1.projectCode = 'p0002';

var project2 = new Project();
project2.code = 'p0002';
project2.name = 'proj wid task';
project2.description = 'okokokokokoookokokokok';
project2.taskCodes.push(task1.code);
project2.author = user3.username;
project2.owner = user4.username;

var task2 = new Task();
task2.code = 't02';
task2.author = user1.username;
task2.name = 'another task';
task2.description = 'a simple task.';
task2.owner = user2.username;

var task3 = new Task();
task3.code = 't03';
task3.author = user3.username;
task3.name = 'a third task';
task3.description = 'another simple task.';
task3.projectCode = 'p0003'
task3.owner = user3.username;

var project3 = new Project();
project3.code = 'p0003';
project3.name = 'proj wid task';
project3.description = 'wowowowowow';
project3.taskCodes.push(task3.code);
project3.author = user2.username;
project3.owner = user1.username;

const testProjects = [project1, project2, project3];
const testTasks = [task1, task2, task3];

/* build test time sheets*/

var tempMoment = new moment('2020-01-01', 'YYYY-MM-DD');
tempMoment.day('Sunday');
var sunday = tempMoment.toDate();

var timeSheet1 = new TimeSheet();
timeSheet1.username = user1.username;
timeSheet1.sundayDate = sunday;

var lineItem1 = new LineItem.LineItemModel();
lineItem1.workItemCode = task1.code;
lineItem1.workItemName = task1.name;
lineItem1.username = user1.username;
lineItem1.sundayDate = timeSheet1.sundayDate;
lineItem1.mondayHours = 3;
lineItem1.tuesdayHours = 4;
lineItem1.wednesdayHours = 5;
lineItem1.thursdayHours = 6;
lineItem1.fridayHours = 8;

var lineItem2 = new LineItem.LineItemModel();
lineItem2.workItemCode = project1.code;
lineItem2.workItemName = project1.name;
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
timeSheet2.username = user3.username;
timeSheet2.sundayDate = sunday;

var lineItem3 = new LineItem.LineItemModel();
lineItem3.workItemCode = task1.code;
lineItem3.workItemName = task1.name;
lineItem3.username = user3.username;
lineItem3.sundayDate = timeSheet2.sundayDate;
lineItem3.mondayHours = 3;
lineItem3.tuesdayHours = 4;
lineItem3.wednesdayHours = 5;
lineItem3.thursdayHours = 6;
lineItem3.fridayHours = 8;

timeSheet2.lineItems.push(lineItem3);

var timeSheet3 = new TimeSheet();
timeSheet3.username = user2.username;
timeSheet3.sundayDate = sunday;

var lineItem4 = new LineItem.LineItemModel();
lineItem4.workItemCode = task3.code;
lineItem4.workItemName = task3.name;
lineItem4.username = user2.username;
lineItem4.sundayDate = timeSheet3.sundayDate;
lineItem4.mondayHours = 3;
lineItem4.tuesdayHours = 4;
lineItem4.wednesdayHours = 5;
lineItem4.thursdayHours = 6;
lineItem4.fridayHours = 8;

timeSheet3.lineItems.push(lineItem4);

const testTimeSheets = [timeSheet1, timeSheet2, timeSheet3];

module.exports.testTimeSheets = testTimeSheets;
module.exports.testUsers = testUsers;
module.exports.testProjects = testProjects;
module.exports.testTasks = testTasks;
