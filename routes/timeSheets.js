var express = require('express');
var router = express.Router();

const timeSheetData = [
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
];

/* GET timeSheets page. */
router.get('/', function(req, res, next) {
  res.json(timeSheetData);
});

/* GET test page. */
router.get('/idk', function(req, res, next) {

    // example.com/ISOdate?param=val
    // SHould return /ISOdate
    const isoDate = req.path;

  res.json({
  				class : 'timeSheetRecord',
  				sundayTimeStamp : isoDate,
  				userName : 'big$C',
  				totalHours : 69
  			});
});

module.exports = router;
