var User = require('../../app_api/models/user') , user = '' , message = '';

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

	'renderSignin' : (req , res , next) => {
																							if (!req.user) {
																																res.render('form/login' , {'title': 'Sign In '	});
																									} else {
																																return res.redirect('/');		}
	} ,

	'renderSignUp' : (req , res , next) => {
																						if (!req.user) {	
																															res.render('form/signup' , {	'title': 'Sign Up' });
																								} else {
																															return res.redirect('/');		}
	} ,

	'signUp' : (req , res , next) => {

		console.log('Request received')
																				if (!req.user) {
																													user = new User(req.body);

																													console.log(user);
																																											message = null;
																																																			user.provider = 'local';
																																					console.log(user);
				user.save((err) => {
														if (err) {
																				console.log(err);
																																				return res.redirect('/signup');
																		}
				req.login(user, (err) => {
																		if (err) return next(err);
																																return res.redirect('/');			});			});
																			} else {
																																return res.redirect('/');
																													}
	} ,

	'signout' : (req , res , next) => {
																				req.logout();
																											res.redirect('/');
	}

}