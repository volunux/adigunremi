const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Genre = require('../../app_api/models/genre'), Country = require('../../app_api/models/country'), Year = require('../../app_api/models/year'), Studio = require('../../app_api/models/studio'),

Language = require('../../app_api/models/language') ,	Title = require('../../app_api/models/title') , Actor = require('../../app_api/models/actor') ,	fs = require('fs') , addTitle = {},

multer = require('multer') , path = require('path') , tSet = require('../config/title') ,	upload = multer({ storage: tSet.multer }) ,  async = require('async') ,	axios = require('axios') , 

data = '' , url = '' , titleDetail = '' , tParam = '' , status = '' , title = '';

module.exports = {

	'title' : (req , res) => {	url = String(tSet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																															res.render('title' , {'title' : '' , 'titles' : data});																	})
										.catch((err) => {				status = err.response;
																																															res.render('error' , {'title' : 'Error' , 'error' : status})														});
	},

	'titleList' : (req , res) => {		url = String(tSet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																															res.render('title' , {'title' : 'Titles' , 'titles' : data , 'page' : true});						})
										.catch((err) => {				status = err.response;
																																															res.render('error' , {'title' : 'Error' , 'error' : status})														});
	},

	'titleDetail' : (req , res) => {	titleDetail = req.params.title , 	url = String(tSet.reqOptions.url + titleDetail);
		
		axios.get(url).then((response) => { 	data = response.data.status , title = data.title;
																																															res.render('title-detail' , {'title' : title , 'detail' : data});												})
									.catch((err) => {				status = err.response;
																																															res.render('error' , {'title' : 'Error' , 'error' : status})														});
	},

	'titleAdd' : (req , res) => {		url = String(tSet.reqOptions.url + 'add');

			axios.get(url).then((response) => { 	data = response.data.status ,	genre = data.Genre ,	country = data.Country , year = data.Year , language = data.Language , studio = data.Studio;

					res.render('form/title-add' , {'title' : 'Add Title' ,	'genres' : genre , 'countries' : country , 'year' : year , 'languages' : language,	'studios' : studio});
					
																																				})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																										});																																		
	},

	'titleAddP' : [ upload.fields(tSet.uploadWare) , 
		
				body('title'										,		'Name of Title must not be empty')											.isLength({ min: 3 }).trim(),
				body('running_time'							, 	'Running time must be provided.')												.isLength({ min: 1 }).trim(),
				body('released_date'						, 	'Released date must be provided.')											.isLength({ min: 1 }).trim(),
				body('producer'									, 	'Producer must be provided.')														.isLength({ min: 1 }).trim(),
				body('spoken_languages'					, 	'At least 2 languages must be provided.')								.isLength({ min: 1 }).trim(),
				body('production_countries'			, 	'At least 2 countries must be provided.')								.isLength({ min: 1 }).trim(),
				body('genre'										, 	'At least 3 genres must be provided.')									.isLength({ min: 1 }).trim(),
				body('production_companies'			, 	'Production company must be provided')									.isLength({ min: 1 }).trim(),
				body('sypnosis'									, 	'Sypnosis must be uploaded.')														.isLength({ min: 1 }).trim(),
				
				sanitizeBody('*').trim().escape(),

				tSet.checkFileUpload ,	tSet.validateFileUpload ,		tSet.addFileUpload ,

				(req , res , next) => { 	

				const errors = validationResult(req);

				var errArr = errors.array();

																			if (req.body.error1) {		errArr.push(req.body.error1);		}

																			if (req.body.error2) {		errArr.push(req.body.error2);		}

																			if (req.body.error3) {		errArr.push(req.body.error3);		}

																			if (req.body.error4) {		errArr.push(req.body.error4);		}


																																																		req.session.titleData = req.body;
																																																																				var title = new Title(req.body);
			if (errArr.length !== 0) {	url = String(tSet.reqOptions.url + 'add');

			axios.get(url).then((response) => { 	
		
					data = response.data.status ,	genre = data.Genre ,	country = data.Country , year = data.Year , language = data.Language , studio = data.Studio;

					res.render('form/title-add' , {'title' : 'Add Title' ,	'genres' : genre , 'countries' : country , 'year' : year , 'languages' : language,	'studios' : studio , 

										 'titleData' : title , 'errors' : errArr});			});			}

       			 	else {	
       			 						res.redirect('/title/actor/add/');			};
	}],

	'titleTrailer' : (req , res) => {		titleDetail = req.params.title , url = String(tSet.reqOptions.url + titleDetail + '/trailer');

			axios.get(url).then((response) => { 	data = response.data.status.Title.trailer ,  title = response.data.status.Title;

				console.log(data);

								res.render('title-detail-trailer' , {'title' : title.title + ' Trailer' , 'titleD' : title , 'detail' : data});																																						});
	},

	'titlePhoto' : (req , res) => {		titleDetail = req.params.title , url = String(tSet.reqOptions.url + titleDetail + '/photos');
			
			axios.get(url).then((response) => { 	data = response.data.status.Title , title = response.data.status.Title;

								res.render('title-detail-photo' , {'title' : title.title + ' Photos' , 'photos' : data});																																																	});																					
	},

	'titleCredits' : (req , res) => {
																						res.render('title-detail-credit' , {'title' : 'Credits' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleCast' : (req , res) => {	titleDetail = req.params.title , url = tSet.reqOptions.url + titleDetail + '/cast';

		axios.get(url).then((response) => { 	data = response.data.status.Title.cast ,  title = response.data.status.Title;

							res.render('title-detail-cast' , {'title' : title.title + ' Cast' , 'cast' : data });																																																				});
	},

	'titleReviews' : (req , res) => {		titleDetail = req.params.title , url = tSet.reqOptions.url + titleDetail + '/reviews';

			axios.get(url).then((response) => { 	data = response.data.status.reviews ,  title = response.data.status;

																res.render('title-reviews' , {'title' : title.title + ' Reviews' , 'reviews' : data , 'ttitle' : title.title});
				});																		
	},

	'titleAddReview' : (req , res) => {
																						res.render('form/title-review-add' , {'title' : 'Add Review'});
	},

	'titleAddReviewP' : [

				body('review_text'							, 	'Review Text must not be empty.')								.isLength({ min: 1 }).trim(),	

				sanitizeBody('*').trim().escape(),
				
				(req , res , next) => {		var review = req.body , title = req.params.title;
																																											const errors = validationResult(req);
								if (!errors.isEmpty()) {																												
																					res.render('form/title-review-add' , {'title' : 'Add Review' ,	'review' : review , 'errors' : errors.array()			});			}
        							else {
															axios({
  																		'method': 'post' ,
  															 													'url' : tSet.reqOptions.url + title + '/reviews' ,
									 																																														'data' : review
  										}).then((response) => { url = '/title/' + req.params.title; 
  																																									res.redirect(url);																											})

  											.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status}) 											});	
				}	}	],

	'titleAddActor' : (req , res) => {		addTitle = req.session.titleData;
																																					if (!addTitle) {			res.redirect('/title/add')		
																																																														return;		}
				Actor.find({})
												.exec((err , result) => {
																										res.render('form/title-actor-add' , {'title' : 'Add Actor' , 'actors' : result});		})
	},

	'titleAddActorP' : (req , res) => {		addTitle = req.session.titleData;
																																						addTitle.cast = req.body.cast;
																																																						req.session.compiledTitle = addTitle;
																		       	res.redirect('/title/trailer/add/');	
	},

	'titleAddTrailer' : (req , res) => {	addTitle = req.session.compiledTitle;

		console.log(addTitle);
																																							if (!addTitle) {			res.redirect('/title/add')		
																																																																return;		}
				
																				res.render('form/title-trailer-add' , {'title' : 'Add Trailer'});		
	},

	'titleAddTrailerP' : [	upload.single('trailer') ,

		(req , res , next) => { 

			addTitle = req.session.compiledTitle;
																																								addTitle.trailer = req.file;
																																																							var body = addTitle;
																															console.log(body);
		axios({
  					'method': 'post' ,
  															'url' : tSet.reqOptions.url ,
							 																								'data' : body
  										
  										}).then((response) => { 	delete req.session.titleData;

  																							delete req.session.compiledTitle;
		  																																							res.redirect('/title');																																	})

												.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status})																				});
											}
	],

	
	'titleUpdateActor' : (req , res) => {		titleDetail = req.params.title , url = tSet.reqOptions.url + titleDetail + '/actor/update' , addTitle = req.session.titleData , $url = `/title/${titleDetail}/update`; 

																																						if (!addTitle) {			res.redirect($url)	
																																																											return;				}

			axios.get(url).then((response) => { 	actor = response.data.status.Actor ,  title = response.data.status.Title;

																res.render('form/title-actor-add' , {'title' : 'Update Actor' , 'ttitle' : title , 'actors' : actor});
				});																
	},

	'titleDelete' : (req , res) => { titleDetail = req.params.title , url = String(tSet.reqOptions.url + titleDetail);
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																				if (!data) {
																																																					return;		}
																																						else {
																																										res.render('delete/title-delete' , {'title' : 'Remove Title' , 'titleData' : data});				}})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status})																});
	},

	'titleDeleteP' : (req , res) => {		titleDetail = req.params.title; 

				axios({	'url' : tSet.reqOptions.url + titleDetail ,
																																				'method' : 'delete' })				
				.then((response) => { 	data = response.data.status;
																																res.redirect('/title')		})
				.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	},

	'titleUpdate' : (req , res) => {		titleDetail = req.params.title , url = tSet.reqOptions.url + titleDetail + '/update';

		axios.get(url).then((response) => { title = response.data.status.Title; data = response.data.status ,	genre = data.Genre ,	country = data.Country , year = data.Year ,

																				language = data.Language , studio = data.Studio , titleData = data.Title;

			res.render('form/title-add' , {'title' : 'Update Title : ' + title.title,	'genres' : genre , 'countries' : country , 'year' : year , 'languages' : language,	'studios' : studio , 'titleData' : titleData});	})
										
									.catch((err) => {				status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	},

	'titleUpdateP' : [ upload.fields(tSet.uploadWare) , 
		
				body('title'										,		'Name of Title must not be empty')											.isLength({ min: 3 }).trim(),
				body('running_time'							, 	'Running or lasting time must be provided.')						.isLength({ min: 1 }).trim(),
				body('released_date'						, 	'Released date must be provided.')											.isLength({ min: 1 }).trim(),
				body('producer'									, 	'Producer must be provided.')														.isLength({ min: 1 }).trim(),
				body('spoken_languages'					, 	'At least 2 languages must be provided.')								.isLength({ min: 1 }).trim(),
				body('production_countries'			, 	'At least 2 countries must be provided.')								.isLength({ min: 1 }).trim(),
				body('genre'										, 	'At least 3 genres must be provided.')									.isLength({ min: 1 }).trim(),
				body('production_companies'			, 	'Production company must be provided')									.isLength({ min: 1 }).trim(),
				body('sypnosis'									, 	'Sypnosis must be uploaded.')														.isLength({ min: 1 }).trim(),
				
				sanitizeBody('*').trim().escape(),

				tSet.checkFileUpload ,	tSet.validateFileUpload ,		tSet.addFileUpload ,

			(req , res , next) => { 	

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error1) {		errArr.push(req.body.error1);		}

																			if (req.body.error2) {		errArr.push(req.body.error2);		}

																			if (req.body.error3) {		errArr.push(req.body.error3);		}

																			if (req.body.error4) {		errArr.push(req.body.error4);		}

																																																		req.session.titleData = req.body;
																																																																				var title = new Title(req.body);
			if (errArr.length !== 0) {	url = String(tSet.reqOptions.url + 'add');

			axios.get(url).then((response) => { 	
		
					data = response.data.status ,	genre = data.Genre ,	country = data.Country , year = data.Year , language = data.Language , studio = data.Studio;

					res.render('form/title-add' , {'title' : 'Add Title' ,	'genres' : genre , 'countries' : country , 'year' : year , 'languages' : language,	'studios' : studio , 

										 'titleData' : title , 'errors' : errArr});			});			}

       			 	else {	url = '/title/' + title.title.toLowerCase().split(' ').join('-') + '/actor/update/';
       			 	
       			 						res.redirect(url);			};
	}],

	'titleUpdateActorP' : (req , res) => {	titleDetail = req.params.title , addTitle = req.session.titleData , addTitle.cast = req.body.cast;
													
																		var body = addTitle;
		axios({
  					'method': 'put' ,
  															'url' : tSet.reqOptions.url + titleDetail ,
  															 																						'data' : body

  										}).then((response) => { delete req.session.titleData;
																	  																							res.redirect('/');
													})
		
												.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})			});
			}
}
