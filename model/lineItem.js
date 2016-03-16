// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// create a schema
var lineItemSchema = new Schema({
  username: { type: String, required: true},
  sundayTimeStamp: { type: Date, required: true},
  workItemKey : {type : String, required: true},
  mondayHours: {type: Number, min: 0, max: 24, required: true},
  tuesdayHours: {type: Number, min: 0, max: 24, required: true},
  wednesdayHours: {type: Number, min: 0, max: 24, required: true},
  thursdayHours: {type: Number, min: 0, max: 24, required: true},
  fridayHours: {type: Number, min: 0, max: 24, required: true},
  saturdayHours: {type: Number, min: 0, max: 24, required: true},
  sundayHours: {type: Number, min: 0, max: 24, required: true}
});
 
// add total hours method to the schema
lineItemSchema.methods.getTotalHours = function getTotalHours() {
 
  var total = 0;
 
  if (!isNaN(parseFloat(this.mondayHours))) {
    total += parseFloat(this.mondayHours);
  }
  if (!isNaN(parseFloat(this.tuesdayHours))) {
    total += parseFloat(this.tuesdayHours);
  }
  if (!isNaN(parseFloat(this.wednesdayHours))) {
    total += parseFloat(this.wednesdayHours);
  }
  if (!isNaN(parseFloat(this.thursdayHours))) {
    total += parseFloat(this.thursdayHours);
  }
  if (!isNaN(parseFloat(this.fridayHours))) {
    total += parseFloat(this.fridayHours);
  }
  if (!isNaN(parseFloat(this.saturdayHours))) {
    total += parseFloat(this.saturdayHours);
  }
  if (!isNaN(parseFloat(this.sundayHours))) {
    total += parseFloat(this.sundayHours);
  }
 
                return total;
};
 
// create a model using the schema
var LineItem = mongoose.model('LineItem', lineItemSchema);
 
// make it available to the rest of the
// Schema to be used by TimeSheetSchema
module.exports.LineItemModel = LineItem;
module.exports.LineItemSchema = lineItemSchema;