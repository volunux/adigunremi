var User = require('../../app_api/models/users') , passport = require('passport');

module.exports = {

		'getUsers' : (req, res, next) => {
																						User.find()
																												.sort({ 'createdOn': 'descending' })
																																														.exec((err, users) => {
																																																											if (err) { return next(err); }
																							res.render('list-user', { 'users': users });
																																															});
																																										},

		'signup' : (req, res) => {
																						res.render('form/signup');
																																					},

		'signupP' : (req, res, next) => {		

			var username = req.body.username , password = req.body.password;

			User.findOne({ username: username }, function(err, user) {
																																		if (err) { return next(err); }
																																		
																																		if (user) {
																																									console.log('error', 'User already exists');
																																																															return res.redirect('/users/signup');		}
										var newUser = new User({
																							username: username ,
																																		password: password		});							
																																																newUser.save(next);		});
																							},

		'login' : (req , res) => {
																	res.render('form/login');
		},

		'userProfile' : (req, res, next) => {
																					User.findOne({ username: req.params.username }, (err, user) => {
																																																						if (err) { return next(err); }
																																																										
																																																						if (!user) { return next(404); }
																																																																							res.render("profile", { user: user });
																																																																});
											},

		ensureAuthenticated : (req, res, next) => {
																								if (req.isAuthenticated()) {
																																							next();
																																												} else {
																																																								res.redirect("/login");
		}
}
}