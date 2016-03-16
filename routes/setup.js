// Grab stuff we need
var express = require('express');
var TimeSheet = require('../model/timeSheet');
var LineItem = require('../model/lineItem');
var User = require('../model/user');
var router = express.Router();

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

const userData = [user1, user2, user3, user4];

/* GET home page. */
router.get('/workItems', function(req, res, next) {
 
    res.json({'resource' : 'work items', 'message' : 'A-OKAY'});
});
 
/* GET home page. */
router.get('/timeSheets', function(req, res, next) {
 
    var timeSheet1 = new TimeSheet();
    timeSheet1.username = "Jmoney";
    var ln1 = new LineItem.LineItemModel();
    ln1.mondayHours = 3;
    ln1.tuesdayHours = 4;
    ln1.wednesdayHours = 5;
    ln1.thursdayHours = 6;
 
    ts1.lineItems.push(ln1);
 
    res.json(ts1);
});
 
router.get('/users', function(req, res, next) {
    
    for (i = 0; i < userData.length; ++i) {
        // TODO for each user, make sure they exisit in DB.
        // TODO if not, save them, else move on
        userData[i];
    }

    // Return A-OKAY, not data
    res.json(userData);
});
 
module.exports = router;