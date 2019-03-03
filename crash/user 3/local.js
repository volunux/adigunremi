var passport = require('passport') , LocalStrategy = require('passport-local').Strategy , User = require('../../app_api/models/user');

module.exports = function() {
		
		passport.use(new LocalStrategy((username, password, done) => {
				
				User.findOne({'username' : username} , (err, user) => {

					console.log(user);
																																if (err) {
																																						return done(err);	}
																																																	if (!user) {

console.log(user);
																																																								//return done(null, false, {'message': 'Unknown user'});	
																																																							}
																																																	
																																																	if (!user.authenticate(password)) {
																																																																				console.log(user);
																																																																				//return done(null, false, {'message': 'Invalid password'	});		
																																																																			}

																																																																			console.log(user);
																																																																				//return done(null, user);
																																																																					});		})
		);
};