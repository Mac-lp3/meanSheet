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

/*
 * TODO TODO TODO TODO
 * How to determine save/submit/approve? You don't. That should be in the client side. But is that unsafe?
 * You should still have logic here. Hax are real. Logic on both.
 */
router.post('/:dateString', function(req, res, next) {

  // TODO get user object
  var isoDate = req.params.dateString;
  var queryDate = moment(dateString, 'YYYY-MM-DD');

  var postedTimeSheet = req.body.timeSheet;

  console.log('got here!');

  // Check if this time sheet has already been submitted
  TimeSheet.findOne({'username' : 'Jmoney', 'sundayDate' : queryDate.toDate()}, 
    function(err, timeSheet) {
      
      // log error
      if (err){
        console.log('got here');
        console.log(err);
      }
      
      // If the time sheet exists...
      if (timeSheet){

        // and it has already been submitted...
        if (timeSheet.isSubmitted) {

          // no actions should be possible on this time sheet
          res.status(409);

        } else {

          // omg validation...
          timeSheet.lineItems = postedTimeSheet.lineItems;
          timeSheet.isSubmitted = postedTimeSheet.isSubmitted;

          timeSheet.save(function (err) {
            
            // log error
            if (err){
              console.log('got here...');
              console.log(err);
              // break out some how
            }

            res.status(200).json(timeSheet);
          });
        }
      }

      // omg validation...
      var timeSheetToSave = new TimeSheet();
      timeSheetToSave.lineItems = postedTimeSheet.lineItems;
      timeSheetToSave.isSubmitted = postedTimeSheet.isSubmitted;
      timeSheetToSave.username = postedTimeSheet.username;
      timeSheetToSave.sundayDate = postedTimeSheet.sundayDate;

      // If the time sheet does not exist, just save it.
      postedTimeSheet.save(function (err) {
            
        // log error
        if (err){
          console.log('got here.......');
          console.log(err);
          // break out some how
        }

        res.status(200).json(postedTimeSheet);
      });
    }
  ); 
});

/* remove line item from time sheet */
router.delete('/:dateString/lineItems/:workItemCode', function(req, res, next){

  // TODO get user object

  // Get the date path variable
  var workItemCode = req.params.workItemCode;
  var isoDate = req.params.dateString;
  var queryDate = moment(dateString, 'YYYY-MM-DD');

  TimeSheet.findOne({'username' : 'Jmoney', 'sundayDate' : queryDate.toDate()}, 
        function(err, timeSheet) {
          
          // log any errors
          if (err){
            console.log(err);
          }
          
          // Make sure time sheet exists
          if (timeSheet){

            // search line items for the one provided
            for (var i = 0; i < timeSheet.workItems.length; i++) {
              if (timeSheet.lineItems[i].workItemCode == workItemCode){
                
                // remove and save
                timeSheet.lineItems.data.splice(i, 1);
                // TODO save
                // TODO read into chaining mongoose functions
              }
            }
          } 
        }
  );

});

/* add new line item to time sheet */
router.post('/:dateString/lineItems', function(req, res, next){

  // Get the date path variable
  var isoDate = req.params.dateString;
  var workItemType = req.body.workItemType;
  var workItemCode = req.body.workItemCode;

  var theCallBack = function (err, theWorkItem) {

      if (err) {

          // something went wrong. log it
          console.log(err);
          // What do??
          this.res.json({
            message: 'mongoose fucked up',
            error: 'idk'
          });
        } else {

          // check if time sheet exists
          if (theWorkItem) {

            var lineItem = new LineItem.LineItemModel();
            lineItem.workItemCode = theWorkItem.code;
            lineItem.workItemName = theWorkItem.name;
            lineItem.workItemType = this.workItemType;
            lineItem.username = 'Jmoney';

            var sundayDate = moment(isoDate, 'YYYY-MM-DD');
            lineItem.sundayDate = sundayDate.toDate();

            this.res.json(lineItem);
          }
          // TODO return a 404 or something
        }
    };

  if (workItemType) {

    if (workItemType == 'Task') {
      Task.findOne({code : workItemCode}, theCallBack.bind({ 'res' : res, 'workItemType' : workItemType}));
    }
    if (workItemType == 'Project') {
      Project.findOne({code : workItemCode}, theCallBack.bind({ 'res' : res, 'workItemType' : workItemType}));
    }
    if (workItemType == 'Leave') {
      // TODO
    }
  }

  // TODO get time sheet and transfer values.
  var lineItem = new LineItem.LineItemModel();
  lineItem.workItemCode = workItemCode;

});

module.exports = router;