const { body,validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var language = require('../../app_api/models/language') , lSet = require('../config/language') , request = require('request') , url = '';

module.exports = {

	'languageList' : (req , res) => {		url = lSet.reqOptions.url;
																																	request(url , (err , resBody , body) => {
																																																												res.render('language' , {'languages' : body.status});
																																																		})
	},

	'languageDetail' : (req , res) => {	var lDetail = req.params.language , url = String(lSet.reqOptions.url + lDetail)

																																																						request(url , (err , resBody , body) => {
																res.render('title' , {'titles' : body.status , 'url' : lDetail});	 	
													})
	},

	'languageAdd' : (req , res) => {
																					res.render('form/language-add' , {'title' : 'Add language'});
	},

	'languageAddP' : [

		body('language' , 'language name required').isLength({'min' : 1}).trim(),

		sanitizeBody('language').trim().escape(),

			(req , res , next) => {
																const errors = validationResult(req);
																																			var language = new language(req.body);
				if (!errors.isEmpty()) {
																				res.render('form/language-add' , {'title' : 'Add language' , 'language' : language , 'errors' : errors.array() });
																																																																								return;
				}
						else {
											lSet.reqOptions.url = 'http://localhost:3000/api/language/name/' + language.language;
																																																		request(lSet.reqOptions, (err , resBody , body) => {
																																																																													var language = body.status;
																if (language) {
																							res.redirect('/language/' + language.language);
																																														return;																																																	
																				}
																						else {
																										lSet.reqOptions = {		'url' : 'http://localhost:3000/api/language/',
																																																												'method' : 'POST',
																																																																						'json' : req.body,
																																																																																'qs' : {}		};
																											request(lSet.reqOptions , (err , resBody , body) => {
																																																							console.log(body);
																																						})
																																				}
																																})
										}			}		
		],

	'languageUpdate' : (req , res) => {		var lDetail = req.params.language;
			
			lSet.reqOptions.url = 'http://localhost:3000/api/language/name/' + lDetail;
																																										request(lSet.reqOptions, (err , resBody , body) => {
																																																																					var language = body.status;
																	if (!language) {

																										console.log(body);
																																										return;
																	}
																			else {
																								res.render('form/language-add' , {'title' : 'Update language' , 'language' : language});
																			}
														});
	},

	'languageUpdateP' : (req , res) => {

		var gParam = req.params.language;
																			lSet.reqOptions = {		'url' : 'http://localhost:3000/api/language/' + gParam,
																																																									'method' : 'PUT',
																																																																		'json' : req.body,
																																																																												'qs' : {}		};
														request(lSet.reqOptions , (err , resBody , body) => {
																																										console.log(body);
																																							});

	},

	'languageDelete' : (req , res) => {

		var lDetail = req.params.language;

																		lSet.reqOptions.url = 'http://localhost:3000/api/language/name/' + lDetail;
																																																								request(lSet.reqOptions, (err , resBody , body) => {
																																																																																			var language = body.status;
																	if (!language) {
																										console.log(body);
																																										return;
																	}
																			else {
																							res.render('delete/language-delete' , {'title' : 'Remove language' , 'language' : language});
																			}
														});
	},

	'languageDeleteP' : (req , res) => {

	var lDetail = req.params.language;
		
																		lSet.reqOptions = { 'url' : 'http://localhost:3000/api/language/' + lDetail,
																																																							'method' : 'DELETE'	};

																													request(lSet.reqOptions, (err , resBody , body) => {
																																																										console.log(body);
														});


	}
	
}