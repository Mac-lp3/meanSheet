// grab the things we need
var mongoose = require('mongoose');
var LineItem = require('./lineItem');
var Schema = mongoose.Schema;
 
// create a schema
var timeSheetSchema = new Schema({
  username: {type: String, required: true},
  sundayDate: {type: Date, required: true},
  lineItems : [LineItem.LineItemSchema]
});
 
// add getTotalHours() to the schema
timeSheetSchema.methods.getTotalHours = function getTotalHours() {

  // set up variables
  var total = 0;
  var temp = 0;

  // iterate through each line item
  for (i = 0; i < this.lineItems.length; ++i) {

    // if this line item has hours, add to total
    temp = this.lineItems[i].getTotalHours()
    if (!isNaN(parseFloat(temp))) {
      total += parseFloat(temp);
    }
  }

  return total;
};
 
// create a model using the schema
var TimeSheet = mongoose.model('TimeSheet', timeSheetSchema);
 
// make it available to the rest of the
module.exports = TimeSheet;