var passport = require('passport') , mongoose = require('mongoose') , User = require('../../app_api/models/user');

module.exports = function() {
																	passport.serializeUser((user, done) => {
																																							done(null, user._id);		});

																	passport.deserializeUser((id, done) => {

																				User.findOne({	'_id' : id } , '-password -salt' , function(err, user)  {	
																																																						done(err, user);	});		});
require('./local')(passport);

};