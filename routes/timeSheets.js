var express = require('express');
var router = express.Router();

/* GET timeSheets page. */
router.get('/', function(req, res, next) {

  // Assume single user for now

  // TODO go to DB and get previous X time sheets

  res.json(timeSheetData);
});

/* GET test page. */
router.get('/*', function(req, res, next) {

    // Get the string following second /
    var isoDate = req.path;

    // Remove the preceeding /
    if (isoDate.charAt(0) === '/'){
      isoDate = isoDate.substring(1);
    } 

    // Ensure it is a date (of ISO format)

    // search DB by username and sundayDate
    // create new if not found
    // send that one back to user

  res.json({
  				class : 'timeSheetRecord',
  				sundayTimeStamp : isoDate,
  				userName : 'big$C',
  				totalHours : 69
  			});
});

module.exports = router;
