var mongoose = require('mongoose'),		Schema = mongoose.Schema , crypto = require('crypto');

var userSchema = new Schema({
																'firstName' : String ,
																												'lastName' : String ,
																																								'email' : {
																																															'type' : String ,
																																																									'unique' : true ,
																																																																			'required' : true } ,
																																							'username' : {
																																															'type' : String ,
																																																									'trim' : true ,
																																																																		'unique' : true ,
																																																																											'required' : 'Username is required'	} ,
																																									'password' : {
																																																 'type' :	String ,
																																																									 'validate': [
																																																																	(password) => {
																																																																									return password.length >= 6;
																																																																																								} ,
																																																																																										'Password should be longer'	]	} ,
																																																							'created_on' : {
																																																																'type' : Date ,
																																																																								default : Date.now 	} ,
																																																												'salt' : {
																																																																		'type' : String
																																																												} ,
																																																															'provider' : {
																																																																							'type' : String ,
																																																																																'required' : 'Provider is required'
																																																															} ,
																'website' : {
																							'type': String ,
																																get : (url) => {
																																									if (!url) {
																																																return url;
																																											} else {
																																																if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
																																																																																			url = 'http://' + url;	}
																																																																																																	return url;
																																																																	}										} } ,
																	'resetPasswordToken' : {
																														'type' : String
																	} ,
																				'resetPasswordExpires' : {
																																			'type' : Date
																				}
} , 

		{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true ,
																							'getters' : true
						},
								'getters' : true
});


userSchema.post('save' , function(next) {
																					if (this.isNew) {
																														console.log('A new user was created.');
																					}
																							else {
																											console.log('A user updated its details.');
																							}
});

userSchema.pre('save', function(next) {
																					if (this.password) {
																																this.salt = new	Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
																																																																							this.password = this.hashPassword(this.password);	}
																																																																																																		next();		});

userSchema.virtual('fullName').get(function() {
																									return this.firstName + ' ' + this.lastName;
})
		.set(function(fullName) {
																var splitName = fullName.split(' ');
																																			this.firstName = splitName[0] || '';
																																																						this.lastName = splitName[1] || '';
});


userSchema.statics.findOneByUsername = function (username , callback) {
																																					this.findOne({ username: new RegExp(username, 'i') }, callback);
};

userSchema.statics.findUniqueUsername = function(username , suffix , callback) {	var _this = this , possibleUsername = username + (suffix || '');
		
		_this.findOne({	'username': possibleUsername }, function(err, user) {
																																					if (!err) {
																																												if (!user) {
																																																			callback(possibleUsername);
																																													} else {
																																																				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);		}
																																															} else {
																																																				callback(null);		}		});
};



userSchema.methods.hashPassword = function(password) {
																													return crypto.pbkdf2Sync(password, this.salt, 10000 , 64 , 'sha512').toString('base64');
};


userSchema.methods.authenticate = function(password) {
																													return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User' , userSchema);