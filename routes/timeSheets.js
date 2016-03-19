var express = require('express');
var testData = require('../test/datastore/testData');
var LineItem = require('../model/lineItem');
var moment = require('moment');
var router = express.Router();


/* GET timeSheets page. */
router.get('/', function(req, res, next) {

  // TODO go to DB and get previous X time sheets
  res.json(testData.testTimeSheets);
});

/* GET test page. */
router.get('/:dateString', function(req, res, next) {

    // Get the date path variable
    var isoDate = req.params.dateString;

    console.log('fetching time sheet for: ' + isoDate);

    // Parse date and check validity
    var providedDate = moment(isoDate, 'YYYY-MM-DD');
    if (providedDate != null && providedDate.isValid()) {
      
      // valid - search DB by username and sundayDate
      var timeSheet = testData.testTimeSheets[0];
      
      // create new if not found

      res.json(timeSheet);
    
    } else {

      // invalid format - send to not found
      res.render('error', {
        message: 'Not a proper date, bud',
        error: 'idk'
      });
    }
});

/* remove line item from time sheet */
router.delete('/:dateString/lineItems/:workItemCode', function(req, res, next){

  // Get the date path variable
  var isoDate = req.params.dateString;
  var workItemCode = req.params.workItemCode;

});

/* add new line item to time sheet */
router.post('/:dateString/lineItems/:workItemCode', function(req, res, next){

  // Get the date path variable
  var isoDate = req.params.dateString;
  var workItemCode = req.params.workItemCode;

  // TODO get time sheet and transfer values.
  var lineItem = new LineItem.LineItemModel();
  lineItem.workItemCode = workItemCode;

});

module.exports = router;