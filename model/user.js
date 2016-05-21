// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department : {type : String},
  emailAddress: {type : String},
});

const SALT_WORK_FACTOR = 15; // dafault is 10

/*
 * Before each save, hash the password if it has been updated.
 * NOTE THAT A PASSWORD IS NOT HASHED UNTIL THE save FUNCTION IS CALLED.
 * THIS MEANS CARE MUST BE TAKEN WHEN DEALING WITH NEW USER INSTNACES,
 * AS THE PASSWORD WILL BE IN PLAIN TEXT UNTIL SAVED.
 */ 
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

userSchema.methods.comparePassword = function(providedPassword, callBack) {
    bcrypt.compare(providedPassword, this.password, function(err, isMatch) {
        if (err) {
        	return callBack(err);
        }
        callBack(null, isMatch);
    });
};
 
// create a model using the schema
var User = mongoose.model('User', userSchema);
 
// make it available to the rest of the
module.exports = User;