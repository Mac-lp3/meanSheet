var express = require('express');
var testData = require('../test/datastore/testData');
var LineItem = require('../model/lineItem');
var Task = require('../model/task');
var Project = require('../model/project');
var TimeSheet = require('../model/timeSheet');
var moment = require('moment');
var async = require('async');
var router = express.Router();

/* GET timeSheets page. */
router.get('/', function(req, res, next) {

  // TODO go to DB and get previous X time sheets
  res.json(testData.testTimeSheets);
});

/* Get single time sheet by date. */
router.get('/:dateString', function(req, res, next) {

    // Get the date path variable
    var dateString = req.params.dateString;

    console.log('fetching time sheet for: ' + dateString);

    // Parse date and check validity
    var inputDate = moment(dateString, 'YYYY-MM-DD');
    if (inputDate != null && inputDate.isValid()) {

      inputDate.day('Sunday');

      // static query to test
      TimeSheet.findOne({'username' : 'Jmoney', 'sundayDate' : inputDate.toDate()}, 
        function(err, timeSheet) {

          if (err) {
            // something went wrong. log it
            console.log(err);

            // redirect to error page
            res.render('error', {
              message: 'mongoose fucked up',
              error: 'idk'
            });

          } else {

            // check if time sheet exists
            if (!timeSheet) {

              // create a new one if not
              timeSheet = new TimeSheet();
              timeSheet.username = 'Jmoney';
              timeSheet.sundayDate = inputDate.toDate();
            }

            // return 
            res.json(timeSheet);
          }
      });

    } else {

      // invalid format - send to not found
      res.render('error', {
          message: 'you done fucked up',
          error: 'lol idk'
      });
    }
});

/* remove line item from time sheet */
router.delete('/:dateString/lineItems/:workItemCode', function(req, res, next){

  // Get the date path variable
  var isoDate = req.params.dateString;
  var workItemCode = req.params.workItemCode;

  // TODO query mongoose for time sheet 
  // TODO iterate over line items
  // TODO remove the one that matches

});

/* add new line item to time sheet */
router.post('/:dateString/lineItems', function(req, res, next){

  // Get the date path variable
  var isoDate = req.params.dateString;
  var workItemType = req.body.workItemType;
  var workItemCode = req.body.workItemCode;

  if (workItemType) {

    if (workItemType == 'Task') {

        Task.findOne({code : workItemCode}, function(err, task) {

        if (err) {

          // something went wrong. log it
          console.log(err);

          // What do??
          res.json({
            message: 'mongoose fucked up',
            error: 'idk'
          });

        } else {

          // check if time sheet exists
          if (task) {

            var lineItem = new LineItem.LineItemModel();
            lineItem.workItemCode = task.code;
            lineItem.workItemName = task.name;
            lineItem.workItemType = 'Task';
            lineItem.username = 'Jmoney';

            var sundayDate = moment(isoDate, 'YYYY-MM-DD');
            lineItem.sundayDate = sundayDate.toDate();

            res.json(lineItem);
          }
          // TODO return a 404 or something
        }
      });
    }
    if (workItemType == 'Project') {

    }
    if (workItemType == 'Leave') {

    }
  }

  // TODO get time sheet and transfer values.
  var lineItem = new LineItem.LineItemModel();
  lineItem.workItemCode = workItemCode;

});

module.exports = router;