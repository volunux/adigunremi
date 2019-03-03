var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var userSchema = new Schema({
																'username' : {
																								'type' : String ,
																																		'trim' : true ,
																																											'unique' : true ,
																																																				'required' : true
																},
																		'email' : {
																									'type' : String ,
																																		'index' : true ,
																																											match: /.+\@.+\..+/
																		},
/*																				'role' : {
																										'type' : String ,
																																			'enum' : ['Admin' , 'Owner' , 'User']
																				}, */
																							'password' : String ,
																																			'created_on' : {
																																													'type' : Date,
																																																					default : Date.now
																																			}
});

userSchema.statics.findOneByUsername = function(username , callback) {
																																					this.findOne({'username' : new new RegExp(username, 'i')	} ,	callback );
};

userSchema.methods.authenticate = function(password) {
																													return this.password === password;
};