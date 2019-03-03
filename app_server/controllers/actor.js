const { body,validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var async = require('async'), path = require('path'), fs = require('fs'), multer = require('multer'), aSet = require('../config/actor'), upload = multer({storage : aSet.multer});

Language = require('../../app_api/models/language') , Title = require('../../app_api/models/title') ,	actor = require('../../app_api/models/actor') ,

Country = require('../../app_api/models/country') , Year = require('../../app_api/models/year') , Actor = require('../../app_api/models/actor') ,

request = require('request') , axios = require('axios') , data = '' , url = '' , aDetail = '' , aParam = '' , status = '' , actor = '';


module.exports = {

	'actorList' : (req , res) => {		url = String(aSet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('actor' , {'title' : 'Actors' , 'actors' : data});				})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})																												});
	},

	'actorListM' : (req , res) => {		url = String(aSet.reqOptions.url + 'm');
			
			axios.get(url).then((response) => { 	data = response.data.status;
																																						res.render('actor' , {'actors' : data});				})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																											});
	},

	'actorListF' : (req , res) => {		url = String(aSet.reqOptions.url + 'f');
			
			axios.get(url).then((response) => { 	data = response.data.status;
																																						res.render('actor' , {'actors' : data});				})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																											});
	},

	'actorDetail' : (req , res) => {	aDetail = req.params.actor , url = String(aSet.reqOptions.url + aDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																						res.render('actor-detail' , {'title' : 'Actor Profile' , 'actor' : data} );	 		})
										.catch((err) => {

										console.log(err);				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																											});
	},

	'actorTitle' : (req , res) => {		aDetail = req.params.actor , url = String(aSet.reqOptions.url + aDetail + '/titles');

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('title' , {'title' : 'Actor Titles' , 'titles' : data});	 		})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})																											});
	},

	'actorAdd' : (req , res) => {
																			res.render('form/actor-add' , {'title' : 'Add Actor'});
	},

	'actorAddP' : [

				upload.any(),

				body('name'											,		'Name must not be empty.')											.isLength({ min: 3 }).trim(),
				body('nickname'									, 	'Nickname time must be provided.')							.isLength({ min: 1 }).trim(),
				body('occupation'								, 	'Occupation must be provided.')									.isLength({ min: 1 }).trim(),
				body('date_of_birth'						, 	'Date of Birth must be provided.')							.isLength({ min: 1 }).trim(),
				body('gender'										, 	'Gender must not be empty.')										.isLength({ min: 1 }).trim(),
				body('nationality'							, 	'Nationality must be provided.')								.isLength({ min: 1 }).trim(),
				body('place_of_birth'						, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('country_of_origin'				, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('state_of_origin'					, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('networth'									, 	'Must not be empty.')														.isLength({ min: 1 }).trim(),
				body('spouse_or_partner'				, 	'This field must be provided.')									.isLength({ min: 1 }).trim(),
				body('biography'								, 	'Biography must be provided.')									.isLength({ min: 1 }).trim(),

				sanitizeBody('*').trim().escape(),
				
				(req , res , next) => {

					var addActor = {} , uFile = req.files[0];
																										if (uFile) {
																																	req.body.cover_image = [];
																																															req.body.cover_image.push(uFile)
																																	}
																																						actor = new Actor(req.body);
																		const errors = validationResult(req);
				if (!errors.isEmpty()) {
																	res.render('form/actor-add' , {'title' : 'Add Actor' , 'actor' : actor , 'errors' : errors.array() });
																																																																					return;
				}
						else {	url = String(aSet.reqOptions.url + 'name/' + req);

			axios.get(url)
										.then((response) => { actor = response.data.status;
																																					if (actor) {
																																												res.redirect('/actor/');
																																																									return;	}
																																					else {
																																									axios({  	'method': 'post' ,
																																  															 								'url' : aSet.reqOptions.url,
																				  															 																																			'data' : req.body 	})
											.then((response) => {		
																																						res.redirect('/actor/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status});		});
																																				}
										});					}

	}],

	'actorUpdate' : (req , res) => {	aDetail = req.params.actor , url = String(aSet.reqOptions.url + 'name/' + aDetail);
															
			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('form/actor-add' , {'title' : 'Update Actor' , 'actor' : data});			})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Error' , 'error' : status})																									});
	},

	'actorUpdateP' : [

				upload.any(),

				body('name'											,		'Name must not be empty.')											.isLength({ min: 3 }).trim(),
				body('nickname'									, 	'Nickname time must be provided.')							.isLength({ min: 1 }).trim(),
				body('occupation'								, 	'Occupation must be provided.')									.isLength({ min: 1 }).trim(),
				body('date_of_birth'						, 	'Date of Birth must be provided.')							.isLength({ min: 1 }).trim(),
				body('gender'										, 	'Gender must not be empty.')										.isLength({ min: 1 }).trim(),
				body('nationality'							, 	'Nationality must be provided.')								.isLength({ min: 1 }).trim(),
				body('place_of_birth'						, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('country_of_origin'				, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('state_of_origin'					, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('networth'									, 	'Must not be empty.')														.isLength({ min: 1 }).trim(),
				body('spouse_or_partner'				, 	'This field must be provided.')									.isLength({ min: 1 }).trim(),
				body('biography'								, 	'Biography must be provided.')									.isLength({ min: 1 }).trim(),

				sanitizeBody('*').trim().escape(),
				
				(req , res , next) => { var url = '';

				var addActor = {} , uFile = req.files[0] , aParam = req.params.actor;
																																								if (uFile) {
																																															req.body.cover_image = [];
																																																													req.body.cover_image.push(uFile)
																																}
																																				actor = new Actor(req.body);
				const errors = validationResult(req);

								if (!errors.isEmpty()) {																												
																					res.render('form/actor-add' , {'title' : 'Update Actor',	'actor' : actor , 'errors' : errors.array()			});
        																																																																									}
        							else {
															axios({	'url' : 'http://localhost:3000/api/actor/' + aParam,
																																														'method' : 'PUT' ,
																																																								'data' : req.body})
																	.then((response) => { 	data = response.data.status;
																																												res.redirect('/actor/')
													})
																	.catch((err) => {				status = err.response;
																																											res.render('error' , {'title' : 'Error' , 'error' : status})			  })
						}																																																		
	}],

	'actorDelete' : (req , res) => {	aDetail = req.params.actor , url = String(aSet.reqOptions.url + 'name/' + aDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('delete/actor-delete' , {'title' : 'Remove actor' , 'actor' : data});
																																			})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})
																												});	
	},

	'actorDeleteP' : (req , res) => {		aDetail = req.params.actor;
		
											axios({  	'method': 'delete' ,
																										  'url' : aSet.reqOptions.url + aDetail	})
											.then((response) => {		
																																						res.redirect('/actor/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status});		});

}

}