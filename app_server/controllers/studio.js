const { body,validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var async = require('async') , path = require('path') , fs = require('fs') , multer = require('multer') ,	axios = require('axios') , sSet = require('../config/studio') ,

Language = require('../../app_api/models/language') , Title = require('../../app_api/models/title') ,	Genre = require('../../app_api/models/genre') ,

Country = require('../../app_api/models/country') , Year = require('../../app_api/models/year') , Actor = require('../../app_api/models/actor') ,

Studio = require('../../app_api/models/studio'), upload = multer({ storage: sSet.multer }) , data = '', url = '' , status = '' , sDetail = '', sParam = '';

module.exports = {

	'studioList' : (req , res) => { url = String(sSet.reqOptions.url);
			
			axios.get(url).then((response) => { 	data = response.data.status;
																																						res.render('studio' , {'title' : 'Studios' , 'studios' : data});			})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																										});
	},

	'studioDetail' : (req , res) => {		sDetail = req.params.studio , url = String(sSet.reqOptions.url + sDetail);

			axios.get(url).then((response) => {		data = response.data.status;
																																						res.render('studio-detail' , {'studio' : data});	 	
																																			})	
										.catch((err) => {				status = err.response;	
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																										});
	},

	'studioTitle' : (req , res) => {	 sDetail = req.params.studio , url = String(sSet.reqOptions.url + sDetail + '/titles');
		
			axios.get(url).then((response) => {		data = response.data.status;
																																						res.render('title' , {'titles' : data});	 	
																																			})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																										});
	},

	'studioAdd' : (req , res) => {
																					res.render('form/studio-add' , {'title' : 'Add Studio'});
	},

	'studioAddP' : [

				upload.single('cover_image') ,

				body('name'											,		'Name must not be empty.')											.isLength({ min: 3 }).trim(),
				body('year_founded'							, 	'Year Founded must be provided.')								.isLength({ min: 1 }).trim(),
				body('country_of_origin'				, 	'Country of Origin must be provided.')					.isLength({ min: 1 }).trim(),
				body('about'										, 	'About must be provided.')											.isLength({ min: 1 }).trim(),

				sSet.validate ,

				(req , res) => {	if (req.file) {	req.body.cover_image = req.file; }

					var studio = new Studio(req.body);

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error) {		errArr.push(req.body.error);		}

																			if (req.body.error2) {	errArr.push(req.body.error2);		}

								if (errArr.length !== 0) {
																						res.render('form/studio-add' , {'title' : 'Add Studio',	'studio' : studio , 'errors' : errArr			});
        																																																																								}
        							else {
															sSet.reqOptions = {		'url' : sSet.reqOptions.url ,
																																									'method' : 'POST' ,
																																																			'json' : req.body }
																				request(sSet.reqOptions, (err , resBody , body) => {
																																															res.redirect('/studio')
													})
        														}																																																	
	}],

	'studioUpdate' : (req , res) => {		sDetail = req.params.studio , url = String(sSet.reqOptions.url + 'name/' + sDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('form/studio-add' , {'title' : 'Update Studio' , 'studio' : data});
																																					})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Error' , 'error' : status})																								});																																									
	},

	'studioUpdateP' : [

				upload.single('cover_image'),

				body('name'											,		'Name must not be empty.')											.isLength({ min: 3 }).trim(),
				body('year_founded'							, 	'Year of Foundation must not be empty.')				.isLength({ min: 1 }).trim(),	
				body('country_of_origin'				, 	'Country of Origin must not be empty.')					.isLength({ min: 1 }).trim(),	
				body('about'										, 	'About must be provided.')											.isLength({ min: 1 }).trim(),

				sanitizeBody('*').trim().escape(),

				sSet.validate ,
				
				(req , res , next) => {	if (req.file) {	req.body.cover_image = req.file; }

					var studio = new Studio(req.body);

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error) {		errArr.push(req.body.error);		}

																			if (req.body.error2) {	errArr.push(req.body.error2);		}

								if (errArr.length !== 0) {																												
																						res.render('form/studio-add' , {'title' : 'Update Studio',	'studio' : studio , 'errors' : errArr			});
        																																																																												}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : sSet.reqOptions.url + sParam,
																								  																 							'data' : req.body 	})
															.then((response) => {		
																																										res.redirect('/studio/');		})
															.catch((err) => {			status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status});		});
        														}																																																	
	}],

	'studioDelete' : (req , res) => {		sDetail = req.params.studio , url = String(sSet.reqOptions.url + 'name/' + sDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('delete/studio-delete' , {'title' : 'Remove Studio' , 'studio' : data});
																																			})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})																											});	
	},

	'studioDeleteP' : (req , res) => {	sDetail = req.params.studio;
		
											axios({  	'method': 'delete' ,
																										  'url' : sSet.reqOptions.url + sDetail	})
											.then((response) => {		
																																						res.redirect('/studio/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Title' , 'error' : status});																										});
	}

}