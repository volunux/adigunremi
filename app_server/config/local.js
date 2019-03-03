var passport = require('passport') , LocalStrategy = require('passport-local').Strategy , User = require('../../app_api/models/user');

module.exports = function() {
		
		passport.use(new LocalStrategy((username, password, done) => {
				
				User.findOne({'username' : username} , (err, user) => {
																																	if (err) {
																																							return done(err);	}
																																																		if (!user) {
																																																																				return done(null, false, {'message' : 'Username provided is incorrect.'});	}
																																		user.comparePassword(password, (err, isMatch) => {
																																																												if (isMatch) {
																																																																				return done(null, user);
      																																																											} else {
        																																																																return done(null, false, {'message' : 'Password provided is incorrect.'});	}
						});
		});
				})); 
};