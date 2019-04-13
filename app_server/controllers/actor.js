const { body,validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var async = require('async'), path = require('path'), fs = require('fs'), multer = require('multer'), aSet = require('../config/actor'), upload = multer({storage : aSet.multer});

Language = require('../../app_api/models/language') , Title = require('../../app_api/models/title') ,	actor = require('../../app_api/models/actor') ,

Country = require('../../app_api/models/country') , Year = require('../../app_api/models/year') , Actor = require('../../app_api/models/actor') ,

request = require('request') , axios = require('axios') , data = '' , url = '' , actorDetail = '' , aParam = '' , status = '' , actor = '';


module.exports = {

	'actorList' : (req , res) => {		url = String(aSet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('actor' , {'title' : 'Actors' , 'actors' : data});				})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})																												});
	},

	'actorListGender' : (req , res) => {		var gender = req.params.gender , url = String(`${aSet.reqOptions.url}gender/${gender}`);
			
			axios.get(url).then((response) => { 	data = response.data.status;
																																						res.render('actor' , {'title' : 'Actors' , 'actors' : data});																											})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																											});
	},

	'actorDetail' : (req , res) => {	actorDetail = req.params.actor , url = String(aSet.reqOptions.url + actorDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																						res.render('actor-detail' , {'title' : 'Actor Profile' , 'actor' : data} );	 		})
										.catch((err) => {
																						status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																											});
	},

	'actorTitle' : (req , res) => {		actorDetail = req.params.actor , url = String(aSet.reqOptions.url + actorDetail + '/titles');

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('title' , {'title' : 'Actor Titles' , 'titles' : data});	 		})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})																											});
	},

	'actorAdd' : (req , res) => {		url = String(aSet.reqOptions.url + 'add');

			axios.get(url).then((response) => { 	data = response.data.status ,	nationality = data.Nationality;

					res.render('form/actor-add' , {'title' : 'Add Actor' , 'nationalities' : nationality });	})

										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																										});
	},

	'actorAddP' : [

				upload.single('cover_image'),

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

				sanitizeBody('*').trim(),
				
					aSet.validate ,

				(req , res , next) => {	if (req.file) {	req.body.cover_image = req.file; }

					var actor = new Actor(req.body);

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error) {		errArr.push(req.body.error);		}

																			if (req.body.error2) {	errArr.push(req.body.error2);		}

				if (errArr.length !== 0) {	url = String(aSet.reqOptions.url + 'add');

			axios.get(url).then((response) => { 	data = response.data.status ,	nationality = data.Nationality;

					res.render('form/actor-add' , {'title' : 'Add Actor' , 'nationalities' : nationality , 'actor' : actor , 'errors' : errArr});	
																																																																					return;
							});
																																																																					}
						else {	url = String(aSet.reqOptions.url + 'name/' + req.body.name.split(' ').join('-') );

			axios.get(url)
										.then((response) => { actor = response.data.status;
																																					if (actor !== null) {
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

	'actorUpdate' : (req , res) => {	actorDetail = req.params.actor , url = String(aSet.reqOptions.url + actorDetail + '/update' );
															
			axios.get(url).then((response) => { 	data = response.data.status , nationality = data.Nationality , actor = data.Actor;

																						res.render('form/actor-add' , {'title' : 'Update Actor' , 'nationalities' : nationality , 'actor' : actor});			})
										
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Error' , 'error' : status})																									});
	} ,

	'actorUpdateP' : [

				upload.single('cover_image') ,

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

				sanitizeBody('*').trim() ,

				aSet.validate ,
				
				(req , res , next) => { aParam = req.params.actor;
																														if (req.file) {	req.body.cover_image = req.file; }
				var actor = new Actor(req.body);

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error) {		errArr.push(req.body.error);		}

																			if (req.body.error2) {	errArr.push(req.body.error2);		}

				if (errArr.length !== 0) {	url = String(aSet.reqOptions.url + 'add');

			axios.get(url).then((response) => { 	data = response.data.status ,	nationality = data.Nationality;

					res.render('form/actor-add' , {'title' : 'Update Actor' , 'nationalities' : nationality , 'actor' : actor , 'errors' : errArr});		 }) }

        							else {
															axios({	'url' : aSet.reqOptions.url + aParam ,
																																							'method' : 'PUT' ,
																																																	'data' : req.body})
																	.then((response) => { 	data = response.data.status;
																																												res.redirect('/actor/')
													})
																	.catch((err) => {				status = err.response;
																																											res.render('error' , {'title' : 'Error' , 'error' : status})			  })
						}																																																		
	}],

	'actorDelete' : (req , res) => {	actorDetail = req.params.actor , url = String(aSet.reqOptions.url + 'name/' + actorDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('delete/actor-delete' , {'title' : 'Remove actor' , 'actor' : data});
																																			})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})
																												});	
	},

	'actorDeleteP' : (req , res) => {		actorDetail = req.params.actor;
		
											axios({  	'method': 'delete' ,
																										  'url' : aSet.reqOptions.url + actorDetail	})
											.then((response) => {		
																																						res.redirect('/actor/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status});		});

}

}
