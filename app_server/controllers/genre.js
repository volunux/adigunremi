const { body,validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Genre = require('../../app_api/models/genre') ,

gSet = require('../config/genre') , request = require('request') , axios = require('axios') , data = '' , url = '' , gDetail = '' , status = '' , genre = '' , gParam = '';

module.exports = {

	'genreList' : (req , res) => {	url = String(gSet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('genre' , {'title' : 'Genre' , 'genres' : data});	})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Error' , 'error' : status})																								});
	},

	'genreDetail' : (req , res) => {	gDetail = req.params.genre ,	url = String(gSet.reqOptions.url + gDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('title' , {'title' : 'Genre' , 'titles' : data});	})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Title' , 'error' : status})																								});
	},

	'genreAdd' : (req , res) => {
																	res.render('form/genre-add' , {'title' : 'Add Genre'});
	},

	'genreAddP' : [

		body('genre' , 'Genre name required').isLength({'min' : 1}).trim(),

		sanitizeBody('genre').trim().escape(),

			(req , res , next) => {
															const errors = validationResult(req);
																																		genre = new Genre(req.body);
				if (!errors.isEmpty()) {
																	res.render('form/genre-add' , {'title' : 'Add Genre' , 'genre' : genre , 'errors' : errors.array() });
																																																																					return;
				}
						else {	url = String(gSet.reqOptions.url + 'name/' + genre.genre);

			axios.get(url)
										.then((response) => { 	genre = response.data.status;
																																					if (genre) {
																																												res.redirect('/genre/' + genre.genre);
																																																																return;	}
										})
										
										.catch((err) => {
																				axios({  	'method': 'post' ,
																																  		'url' : gSet.reqOptions.url ,
																				  															 														'data' : req.body 	})
											.then((response) => {		
																																						res.redirect('/genre/');		})
											.catch((err) => {			
																						status = err.response;
																																						res.render('error' , {'title' : 'Title' , 'error' : status});		});
																														});
																	}}				 
		],

	'genreUpdate' : (req , res) => {	gDetail = req.params.genre , url = String(gSet.reqOptions.url + 'name/' + gDetail);
															
			axios.get(url).then((response) => { 	data = response.data.status;
																																								res.render('form/genre-add' , {'title' : 'Update Genre' , 'genre' : data});
																																					})
										.catch((err) => {				status = err.response;
																																								res.render('error' , {'title' : 'Title' , 'error' : status})																							});																																									
	},

	'genreUpdateP' : [

		body('genre' , 'Genre name required').isLength({'min' : 1}).trim(),

		sanitizeBody('genre').trim().escape(),

			(req , res , next) => {		const errors = validationResult(req);
																																				gParam = req.params.genre , genre = new Genre(req.body);
				if (!errors.isEmpty()) {
																	res.render('form/genre-add' , {'title' : 'Update Genre' , 'genre' : genre , 'errors' : errors.array() });
																																																																					return;
				}
						else {
											axios({  	'method': 'put' ,
																								  'url' : gSet.reqOptions.url + gParam,
																				  																 							'data' : req.body 	})
											.then((response) => {		
																																						res.redirect('/genre/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Title' , 'error' : status});																										});
														} }
		],

	'genreDelete' : (req , res) => {	gDetail = req.params.genre , url = String(gSet.reqOptions.url + 'name/' + gDetail);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('delete/genre-delete' , {'title' : 'Remove Genre' , 'genre' : data});
																																			})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})																											});	
	},

	'genreDeleteP' : (req , res) => {		gDetail = req.params.genre;
		
											axios({  	'method': 'delete' ,
																										  'url' : gSet.reqOptions.url + gDetail	})
											.then((response) => {		
																																						res.redirect('/genre/');		})
											.catch((err) => {			status = err.response;
																																						res.render('error' , {'title' : 'Title' , 'error' : status});																										});
	}
	
}