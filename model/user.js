// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department : {type : String},
  email: {type : String},
});

const SALT_WORK_FACTOR = 15; // dafault is 10

// before each save, hash the password if it has been updated
userSchema.pre('save', function(next) {

    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')){
    	return next();
    } 

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

        if (err) {
        	return next(err);
        }

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {

            if (err){
            	return next(err);
            }

            // override the plain password with the hashed one
            user.password = hash;
            next();
        });
    });
});
 
// create a model using the schema
var User = mongoose.model('User', userSchema);
 
// make it available to the rest of the
module.exports = User;