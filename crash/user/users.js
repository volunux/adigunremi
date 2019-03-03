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

		'signupP' : (req, res, next) => {		var body = req.body;

			User.findOne({ username: body.username }, function(err, user) {
																																		if (err) { return next(err); }
																																		
																																		if (user) {
																																									console.log('error', 'User already exists');
																																																															return res.redirect('/users/signup');		}
										var newUser = new User(body);							

										console.log(newUser);
																												newUser.save(next);		});

			User.createUser(newUser, (err, user) => { 
																					      if(err) throw err;
																															      res.send(user).end()
    																	});
 																							

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
												},

		'logout' : (req , res) => {
																	 req.logout();
  																								res.redirect('/');
								},

		'isLoggedIn' : (req , res , next)=> {
																						if (req.isAuthenticated()) {
      																																			return next();
																										}
  																												res.redirect('/');
		}
}