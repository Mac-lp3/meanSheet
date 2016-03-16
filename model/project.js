// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
Projects may or may not have a "definition" of done. Time towards an 
ongoing body of work should be logged against a project. Individual 
tasks can be assigned to a project - in which case time logged 
against the task will be included in the project's reports.
*/
 
// create a schema
var projectSchema = new Schema({
  code: { type: String, required: true},
  name: { type: String, required: true},
  author: { type: String, required: true},
  owner: {type : String, required: true},
  taskCodes: [String],
  description: {type: String, required: true}
});

// create a model using the schema
var Project = mongoose.model('Project', projectSchema);
 
// make it available to the rest of the
module.exports = Project;