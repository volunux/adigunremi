const { body,validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var request = require('request') , cSet = require('../config/country') , axios = require('axios') , data = '' , url = '' , cDetail = '' , status = '' , cParam = '' , country = '';


module.exports = {

	'countryList' : (req , res) => {		url = String(cSet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('country' , {'title' : 'Country' , 'countries' : data}) })
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Error' , 'error' : status})																								});
	},

	'countryDetail' : (req , res) => {	cDetail = req.params.country ,	url = String(cSet.reqOptions.url + cDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('title' , {'title' : 'Title' , 'titles' : data });		})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Error' , 'error' : status})
																																																																																															});			
	},

	'countryAdd' : (req , res) => {
																					res.render('form/country-add' , {'title' : 'Add country'});
	},

	'countryAddP' : [

		body('country' , 'Country name required').isLength({'min' : 1}).trim(),

		sanitizeBody('country').trim().escape(),

			(req , res , next) => {
															const errors = validationResult(req);
																																		country = new Country(req.body);
				if (!errors.isEmpty()) {
																	res.render('form/country-add' , {'title' : 'Add Country' , 'country' : country , 'errors' : errors.array() });
																																																																									return;
				}
						else {	url = String(cSet.reqOptions.url + 'name/' + country.country);

			axios.get(url)
										.then((response) => { 	country = response.data.status;
																																							if (country) {
																																															res.redirect('/country/' + country.country);
																																																																						return;	}
																																							else {
																																											axios({  	'method': 'post' ,
																																		  															 								'url' : cSet.reqOptions.url,
																						  															 																																			'data' : req.body 	})
											.then((response) => {		
																																						res.redirect('/country/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status});		});
																																				}
										});					} }
		],

	'countryUpdate' : (req , res) => {	cDetail = req.params.country , url = String(cSet.reqOptions.url + 'name/' + cDetail);
															
			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('form/country-add' , {'title' : 'Update Country' , 'country' : data});
																																					})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Error' , 'error' : status})																								});		
	},

	'countryUpdateP' :  [

		body('country' , 'Country name required').isLength({'min' : 1}).trim(),

		sanitizeBody('country').trim().escape(),

			(req , res , next) => {		const errors = validationResult(req);
																																				cParam = req.params.country , country = new Country(req.body);
				if (!errors.isEmpty()) {
																	res.render('form/country-add' , {'title' : 'Update Country' , 'country' : country , 'errors' : errors.array() });
																																																																											return;
				}
						else {
											axios({  	'method': 'put' ,
																								  'url' : cSet.reqOptions.url + cParam,
																				  																 							'data' : req.body 	})
											.then((response) => {		
																																						res.redirect('/country/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status});		});
														} }
		],

	'countryDelete' : (req , res) => {		cDetail = req.params.country , url = String(cSet.reqOptions.url + 'name/' + cDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('delete/country-delete' , {'title' : 'Remove Country' , 'country' : data});
																																			})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})																											});	
	},

	'countryDeleteP' : (req , res) => {		cParam = req.params.country;
		
											axios({  	'method': 'delete' ,
																										  'url' : cSet.reqOptions.url + cDetail	})
											.then((response) => {		
																																						res.redirect('/country/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status});		});
	}
	
}