var mongoose = require('mongoose') , Schema = mongoose.Schema , bcrypt = require('bcrypt-nodejs') , salt_factor = 10 , noop = function() {};

var userSchema = new Schema({
																	'username' : {	'type' : String,
																																		'minlength' : 1,
																																											'required' : true,
																																																					'maxlength' : 30,
																																																														'unique' : true
																	},
																			'password' : {	'type' : String ,
																																				'required' : true ,
																			},
																					'mail_address' : {	'type' : String ,
																																									'required' : true ,
																																																			'unique' : true
																			}
});

userSchema.methods.createUser = (newUser, callback) => {
  																										bcrypt.genSalt(10, (err, salt) => {
  																																												bcrypt.hash(newUser.password, salt, (err, hash) => {
  																																																																							newUser.password = hash;
  																																																																																				newUser.save(callback);
    																							});
  																		});
}

userSchema.methods.getUserByUsername = (username, callback) => {
  																																var query = {username: username};
  																																																	User.findOne(query, callback);
}

userSchema.methods.getUserById = (id, callback) => {
  																														User.findById(id, callback);
}

userSchema.methods.validPassword = function(pwd) {
																											return this.password = pwd;
}

userSchema.methods.comparePassword = (candidatePassword, hash, callback) => {
  																																						bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
  																																																																				if(err) throw err;
  																																																																														callback(null, isMatch);
  														});
}


module.exports = mongoose.model('User' , userSchema);