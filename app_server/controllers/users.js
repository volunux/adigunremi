var User = require('../../app_api/models/user') , user = '' , message = '' , async = require('async') , token = '' , nodemailer = require('nodemailer') , passport = require('passport') , crypto = require('crypto'),

config = require('../../app_server/config/config');

module.exports ={

	'create' : (req , res , next) => {	user = new User(req.body);

				user.save((err) => {
															if (err) {
																					console.log(err);
																															return next(err);
															}
																	else {
																					res.json(user);
																	}
				})
	} ,

	'profile' : (req , res , next) => {
																				res.render('profile' , {'title' : 'User Profile'});
	} ,

	'userById' : (req , res , next , id) => {

			User.findOne({_id : id})
															.exec((err , user) => {
																												if (err) {
																																		return next(err);
																												}	
																													else {
																																	req.user = user;
																																										next();
																													}
															})
	} ,

	'read' : (req , res , next) => {
																			res.json(req.user);
	} ,

	'update' : (req , res , next) => {

			User.findByIdAndUpdate(req.user.id , req.body , (err , user) => {
																																					if (err) {
																																												return next(err);
																																					}
																																							else {
																																												res.json(user);
																																							}
			})
	} ,

	'delete' : (req , res , next) => {
		
		req.user.remove((err) => {	
																if (err) {
																						console.log(err);
																															return next(err);
																}	else {
																						res.json(user);
																}
																			})
	} ,

	'renderSignIn' : (req , res , next) => {
																																res.render('form/login' , {'title': 'Sign In '	, 'user' : req.user});
	} ,

	'signin' : (req, res, next) =>{

			passport.authenticate('local' , (err , user , info) => {
																																		if (err) {
																																										return next(err);		}

																																		if (!user) {
																																									req.flash('error' , info.message);
																																																															return res.redirect('/login')		}
    
    		req.logIn(user, (err) => {
    																if (err) {
    																							return next(err);		}
      																						
      																						return res.redirect('/');			});
    																																								})(req, res, next);
} ,

	'renderSignUp' : (req , res , next) => {
																						if (!req.user) {	
																															res.render('form/signup' , {	'title': 'Sign Up' });
																								} else {
																															return res.redirect('/');		}
	} ,

	'signUp' : (req , res , next) => {	user = new User(req.body);
																																	message = null;
																																									user.provider = 'local';
				user.save((err) => {
															if (err) {
																					return res.redirect('/signup');		}

					token = user.generateJwt();
																			config.response(res , 200 , {'token' : token});
																																															});

	} ,

	'signout' : (req , res , next) => {
																				req.logout();
																											res.redirect('/');
	} ,

	'forgot' : (req, res) => {
 																	 res.render('form/forgot', { 'title' : 'Forgot Credentials' , 'user' : req.user });
								} ,

	'forgotP' : (req, res, next) => {
			
			async.waterfall([
    		
    		(done) => {
    												crypto.randomBytes(20, (err, buf) => {	token = buf.toString('hex');
        																																													done(err, token);						});
    														},
    		(token, done) => {
      											User.findOne({ 'email' : req.body.email }, (err, user) => {
      																																										if (!user) {
      																																																	req.flash('error' , 'No account with that email address exists.');
      																																																																																			return res.redirect('/forgot');		}
        user.resetPasswordToken = token;
        																	user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save((err) => {
          										done(err, token, user);		});				});
    																																																																} , 
    	(token, user, done) => {	var smtpTransport = nodemailer.createTransport({
																																									'service': 'Gmail' ,
																																																				'auth': {
																																																										'user' : 'volunux@gmail.com' ,
																																																																										'pass' : '08099757823'
        																																																	}			});

      var mailOptions = {
      											'to' : user.email , 
      																						'from' : 'passwordreset@demo.com' ,
      																																								'subject': 'Node.js Password Reset' ,
       	'text' : 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'							 };

      smtpTransport.sendMail(mailOptions, (err) => {
        																							req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        																																																																							done(err, 'done');		});
    																								}
  ] , (err) => {
    							if (err) return next(err);
    																					res.redirect('forgot');
  								});
					} ,

	'reset' : (req , res) => {
  
  User.findOne({ 'resetPasswordToken' : req.params.token, 'resetPasswordExpires' : { '$gt': Date.now() } } , (err , user)  => {
  																																																															if (!user) {
  																																																																						req.flash('error', 'Password reset token is invalid or has expired.');
      																																															return res.redirect('form/forgot');
      																																																																						}
    											res.render('form/reset' , { 'user' : req.user });
  																																				});
																																} ,
	'resetP' : (req, res) => {
  	
  		async.waterfall([
    		
    		(done) => {
      							User.findOne({ 'resetPasswordToken' : req.params.token , 'resetPasswordExpires' : { '$gt' : Date.now() } } , (err, user) => {
      								
      								if (!user) {
          													req.flash('error', 'Password reset token is invalid or has expired.');
          																																																	return res.redirect('back');		}
        user.password = req.body.password;
        																		user.resetPasswordToken = undefined;
        																																					user.resetPasswordExpires = undefined;
        user.save((err) => {
        											req.logIn(user, (err) => {
            																							done(err, user);		});		});		});
    															} ,
				(user, done) => {
													var smtpTransport = nodemailer.createTransport({
																																						'service': 'Gmail' ,
																																																	'auth': {
																																																							'user' : 'volunux@gmail.com' ,
																																																																							'pass' : '08099757823'
        																																																	}			});
      										var mailOptions = {
      																				'to' : user.email ,
      																														'from': 'passwordreset@demo.com' ,
      																																																'subject': 'Your password has been changed' ,
      																				'text': 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'		};

      												smtpTransport.sendMail(mailOptions, (err) => {
      																																				req.flash('success', 'Success! Your password has been changed.');
      																																																																					done(err);
      																																																																											});
    																										}
  		] , (err) => {
    									res.redirect('/');										});
				} ,

		'ensureAuthenticated' : (req, res, next) => {
																									//if (req.isAuthenticated()) {

																										if (true) {
																																							next();
																																												} else {
																																																	res.redirect('/login');			}
												}
}