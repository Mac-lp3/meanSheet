var assert = require('assert');
var TimeSheet = require('../model/timeSheet'); 
var LineItem = require('../model/lineItem'); 

var timeSheet = new TimeSheet();
var lineItem1 = new LineItem.LineItemModel();
var lineItem2 = new LineItem.LineItemModel();

describe('TimeSheet', function() {


  before('add line items to time time sheet.', function() {
    
  	lineItem1.mondayHours = 4;
  	lineItem1.tuesdayHours = 4;
  	lineItem1.wednesdayHours = 4;
  	lineItem1.thursdayHours = 4;
  	lineItem1.fridayHours = 4;

  	lineItem2.mondayHours = 4;
  	lineItem2.tuesdayHours = 4;
  	lineItem2.wednesdayHours = 4;
  	lineItem2.thursdayHours = 4;
  	lineItem2.fridayHours = 4;

  	timeSheet.lineItems.push(lineItem1);
  	timeSheet.lineItems.push(lineItem2);

  });

  describe('#getTotalHours()', function() {
  	it('should total 40', function() {
      assert.equal(40, timeSheet.getTotalHours());
    });

  });
});