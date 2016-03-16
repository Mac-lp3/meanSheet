// grab the things we need
var mongoose = require('mongoose');
var LineItem = require('./lineItem');
var Schema = mongoose.Schema;
 
// create a schema
var timeSheetSchema = new Schema({
  username: {type: String, required: true},
  sundayTimeStamp: {type: Date, required: true},
  lineItems : [LineItem.LineItemSchema]
});
 
// add total hours method to the schema
timeSheetSchema.methods.getTotalHours = function getTotalHours() {
 
                var total = 0;
                var temp = 0;
 
                for (i = 0; i < this.lineItems.length; ++i) {
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