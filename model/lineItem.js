// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// create a schema
var lineItemSchema = new Schema({
  username: { type: String, required: true},
  sundayDate: { type: Date, required: true},
  workItemCode : {type: String, required: true},
  workItemName : {type: String, required: true},
  mondayHours: {type: Number, min: 0, max: 24, required: true, default: 0},
  tuesdayHours: {type: Number, min: 0, max: 24, required: true, default: 0},
  wednesdayHours: {type: Number, min: 0, max: 24, required: true, default: 0},
  thursdayHours: {type: Number, min: 0, max: 24, required: true, default: 0},
  fridayHours: {type: Number, min: 0, max: 24, required: true, default: 0},
  saturdayHours: {type: Number, min: 0, max: 24, required: true, default: 0},
  sundayHours: {type: Number, min: 0, max: 24, required: true, default: 0}
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