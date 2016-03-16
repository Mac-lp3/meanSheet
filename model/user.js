// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department : {type : String},
  email: {type : String},
});
 
// create a model using the schema
var User = mongoose.model('User', userSchema);
 
// make it available to the rest of the
module.exports = User;