var express = require('express');
var testData = require('../test/datastore/testData');
var LineItem = require('../model/lineItem');
var TimeSheet = require('../model/timeSheet');
var moment = require('moment');
var async = require('async');
var router = express.Router();

/* get work items page. */
router.get('/', function(req, res, next) {

  // TODO - pagination? Just a subset?
  res.json([testData.testTasks, testData.testProjects]);
});

