const { body,validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Year = require('../../app_api/models/year') ,

ySet = require('../config/year') , request = require('request') , axios = require('axios') , data = '' , url = '' , yDetail = '' , status = '' , year = '' , yParam = '';

module.exports = {

	'yearList' : (req , res) => {	url = String(ySet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('year' , {'title' : 'Year' , 'years' : data});	})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Error' , 'error' : status})
																												});
	},

	'yearDetail' : (req , res) => {	yDetail = req.params.year ,	url = String(ySet.reqOptions.url + yDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('title' , {'title' : 'Year' , 'titles' : data});	})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Title' , 'error' : status})
																												});
	},

	'yearAdd' : (req , res) => {
																	res.render('form/year-add' , {'title' : 'Add Year'});
	},

	'yearAddP' : [

		body('year' , 'Year name required').isLength({'min' : 1}).trim(),

		sanitizeBody('year').trim().escape(),

			(req , res , next) => {
															const errors = validationResult(req);
																																		year = new Year(req.body);
				if (!errors.isEmpty()) {
																	res.render('form/year-add' , {'title' : 'Add Year' , 'year' : year , 'errors' : errors.array() });
																																																																					return;
				}
						else {	url = String(ySet.reqOptions.url + 'name/' + year.year);

			axios.get(url)
										.then((response) => { 	year = response.data.status;
																																					if (year) {
																																												res.redirect('/year/' + year.year);
																																																																return;	}
																																					else {
																																									axios({  	'method': 'post' ,
																																  															 								'url' : ySet.reqOptions.url,
																				  															 																																			'data' : req.body 	})
											.then((response) => {		
																																						res.redirect('/year/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Title' , 'error' : status});		});
																																				}
										});					} }
		],

/*
	'yearUpdate' : (req , res) => {	yDetail = req.params.year , url = String(ySet.reqOptions.url + 'name/' + yDetail);
															
			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('form/year-add' , {'title' : 'Update Year' , 'year' : data});
																																					})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Title' , 'error' : status})
																												});																																									
	},

	'yearUpdateP' : [

		body('year' , 'Year name required').isLength({'min' : 1}).trim(),

		sanitizeBody('year').trim().escape(),

			(req , res , next) => {		const errors = validationResult(req);
																																				yParam = req.params.year , year = new Year(req.body);
				if (!errors.isEmpty()) {
																	res.render('form/year-add' , {'title' : 'Update Year' , 'year' : year , 'errors' : errors.array() });
																																																																					return;
				}
						else {
											axios({  	'method': 'put' ,
																								  'url' : ySet.reqOptions.url + yParam,
																				  																 							'data' : req.body 	})
											.then((response) => {		
																																						res.redirect('/year/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Title' , 'error' : status});		});
														} }
		],

	'yearDelete' : (req , res) => {	yDetail = req.params.year , url = String(ySet.reqOptions.url + 'name/' + yDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('delete/year-delete' , {'title' : 'Remove Year' , 'year' : data});
																																			})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})
																												});	

	},

	'yearDeleteP' : (req , res) => {		yDetail = req.params.year;
		
											axios({  	'method': 'delete' ,
																										  'url' : ySet.reqOptions.url + yDetail	})
											.then((response) => {		
																																						res.redirect('/year/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Title' , 'error' : status});		});
	}

*/

}