var assert = require('assert');
var testData = require('./datastore/testData');
var timeSheet = {};


describe('TimeSheet', function() {


  before('add line items to time time sheet.', function() {

    timeSheet = testData.testTimeSheets[0];

  });

  describe('#getTotalHours()', function() {
  	it('should total 51', function() {
      assert.equal(51, timeSheet.getTotalHours());
    });

  });
});