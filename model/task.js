// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
Tasks are meant to have a "definition" of done. Tasks are not meant to 
track time towards an ongoing body of work (see projects). Tasks can 
be assigned to a project - in which case time logged against the task
will be included in reports against that project.
*/
 
// create a schema
var taskSchema = new Schema({
  code: { type: String, required: true},
  name: { type: String, required: true},
  author: {type: String, required: true},
  owner: {type : String, required: true},
  projectCode: {type : String, required: false},
  description: {type: String, required: true}
});

// create a model using the schema
var Task = mongoose.model('Task', taskSchema);
 
// make it available to the rest of the
module.exports = Task;