var mongoose = require('mongoose'),		Schema = mongoose.Schema , crypto = require('crypto') , salt_factor = 10 , bcrypt = require('bcrypt-nodejs') , async = require('async') , jwt = require('jsonwebtoken');

mongoose.set('useCreateIndex', true);

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
																																																															'default' : Date.now 	} ,
																																														'provider' : {
																																																						'type' : String ,
																																																																'required' : 'Provider is required'	} ,
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

userSchema.pre('save', function(next) {	var user = this;
																																if (!user.isModified('password'))  {
																																																			return next(); } 
			bcrypt.genSalt(salt_factor , (err , salt) => {
																																if (err) { 
																																																			return next(err); }

			bcrypt.hash(user.password , salt , null , (err , hash) => {
																																	if (err) {
																																																			return next(err); }
      user.password = hash;
      												next();																																																		});			});			});


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



userSchema.methods.comparePassword = function(cPassword , cb) {
	
	bcrypt.compare(cPassword , this.password, function(err , isMatch) {
    																																		if (err) {
    																																								return cb(err); }
    																																																		cb(null, isMatch);		});
};

userSchema.methods.generateJwt = function() {	var expiry = new Date();
	
		expiry.setDate(expiry.getDate() + 7);
																						return jwt.sign({
																																'_id': this._id ,
																																									'email': this.email ,
																																																				'username': this.usernname ,
																																																																			'exp': parseInt(expiry.getTime() / 1000) ,
																																																																																									}, process.env.JWT_SECRET );
};

module.exports = mongoose.model('User' , userSchema);