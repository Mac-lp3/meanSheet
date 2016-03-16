'use strict';

var express = require('express');
var router = express.Router();

const timeSheetData = {
	{ 
		sundayTimeStamp : '2016-04-20',
  		userName : 'maclp3',
  		totalHours : 42
  	},
	{
		sundayTimeStamp : '2016-04-13',
  		userName : 'maclp3',
  		totalHours : 69
	},
	{
		sundayTimeStamp : '2016-04-06',
  		userName : 'maclp3',
  		totalHours : 311
	}
};

/* GET timeSheets page. */
router.get('/timeSheets', function(req, res, next) {
  res.json(timeSheetData);
});

/* GET test page. */
router.get('/timeSheets/{date}', function(req, res, next) {
  res.json({
  				class : 'timeSheetRecord',
  				sundayTimeStamp : '2020-04-01',
  				userName : 'big$C',1
  				totalHours : 69
  			});
});

module.exports = router;
