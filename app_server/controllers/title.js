const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Genre = require('../../app_api/models/genre'), Country = require('../../app_api/models/country'), Year = require('../../app_api/models/year'), Studio = require('../../app_api/models/studio'),

Language = require('../../app_api/models/language') ,	Title = require('../../app_api/models/title') , Actor = require('../../app_api/models/actor') ,	fs = require('fs') , addTitle = {},

multer = require('multer') , path = require('path') , tSet = require('../config/title') ,	upload = multer({ storage: tSet.multer }) ,  async = require('async') ,	request = require('request') ,

axios = require('axios') , data = '' , url = '' , tDetail = '' , tParam = '' , status = '' , title = '';

module.exports = {

	'title' : (req , res) => {	url = String(tSet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('title' , {'title' : '' , 'titles' : data});
																																			})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																										});
	},

	'titleList' : (req , res) => {		url = String(tSet.reqOptions.url);

			axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('title' , {'title' : 'Titles' , 'titles' : data , 'page' : 'list'});
																																			})
										.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})																										});
	},

	'titleDetail' : (req , res) => {	tDetail = req.params.title , 	url = String('http://limitless-stream-60828.herokuapp.com/api/title/' + tDetail);
		
		axios.get(url).then((response) => { 	data = response.data.status , title = data.title;
																																														res.render('title-detail' , {'title' : title, 'detail' : data});	
																																	})
									.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status})																										});
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
				body('running_time'							, 	'Running or lasting time must be provided.')						.isLength({ min: 1 }).trim(),
				body('released_date'						, 	'Released date must be provided.')											.isLength({ min: 1 }).trim(),
				body('producer'									, 	'Producer must be provided.')														.isLength({ min: 1 }).trim(),
				body('spoken_languages'					, 	'At least 2 languages must be provided.')								.isLength({ min: 1 }).trim(),
				body('production_countries'			, 	'At least 2 countries must be provided.')								.isLength({ min: 1 }).trim(),
				body('genre'										, 	'At least 3 genres must be provided.')									.isLength({ min: 1 }).trim(),
				body('production_companies'			, 	'Production company must be provided')									.isLength({ min: 1 }).trim(),
				body('plot'											, 	'Plot must be uploaded.')																.isLength({ min: 1 }).trim(),
				
				sanitizeBody('*').trim().escape(),

			(req , res , next) => { 	var pData = [], tData = [], cData = [] , title = '';
																																											const errors = validationResult(req);
			tSet.arrangeFiles(fs , req , path , pData , tData , cData);
																																		tSet.createTitle(req.body , addTitle);
																																																						req.session.titleData = addTitle;
																																																																								preTitle = req.session.titleData;
																																														title = new Title(preTitle);

																																														console.log(title)
			if (!errors.isEmpty()) {
																url = String(tSet.reqOptions.url + 'add');

			axios.get(url).then((response) => { 	
																					if (err) { 	return next(err); }
		
					data = response.data.status ,	genre = data.Genre ,	country = data.Country , year = data.Year , language = data.Language , studio = data.Studio;

					res.render('form/title-add' , {'title' : 'Add Title' ,	'genres' : genre , 'countries' : country , 'year' : year , 'languages' : language,	'studios' : studio , 

										 'titleData' : title , 'errors' : errors.array()});
					
																	});			}
       			 																	else {	
       			 																					res.redirect('/title/name/actor/add/');		
       			 																	};
	}],

	'titleTrailer' : (req , res) => {		tDetail = req.params.title , url = String(tSet.reqOptions.url + tDetail + '/trailers');

			axios.get(url).then((response) => { 	data = response.data.status.Title.trailer ,  title = response.data.status.Title;

				if (data) {

					console.log('It is empty');

					console.log(data);
				}

								res.render('title-detail-trailer' , {'title' : title.title + ' Trailer' , 'titleD' : title , 'detail' : data});	
					});
	},

	'titlePhoto' : (req , res) => {		tDetail = req.params.title , url = String(tSet.reqOptions.url + tDetail + '/photos');
			
			axios.get(url).then((response) => { 	data = response.data.status.Title , title = response.data.status.Title;

				res.render('title-detail-photo' , {'title' : title.title + ' Photos' , 'photos' : data});																																																					});																					
	},

	'titleCredits' : (req , res) => {
																						res.render('title-detail-credit' , {'title' : 'Credits' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleCast' : (req , res) => {	tDetail = req.params.title , url = 'http://limitless-stream-60828.herokuapp.com/api/title/' + tDetail + '/cast';

		axios.get(url).then((response) => { 	data = response.data.status.Title.cast ,  title = response.data.status.Title;

							res.render('title-detail-cast' , {'title' : title.title + ' Cast' , 'cast' : data });																																																				});
	},

	'titleReviews' : (req , res) => {		tDetail = req.params.title , url = 'http://limitless-stream-60828.herokuapp.com/api/title/' + tDetail + '/reviews';

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
																					res.render('form/title-review-add' , {'title' : 'Update Studio',	'review' : review , 'errors' : errors.array()			});
        																																																																											}
        							else {
															axios({
  																		'method': 'post' ,
  															 													'url' : 'http://limitless-stream-60828.herokuapp.com/api/title/' + title + '/reviews' ,
  															 																																														'data' : review
  										}).then((response) => {
  																							res.redirect('/title');
													})

  											.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status}) });	

        						}																																																	
	}	],

	'titleAddActor' : (req , res) => {		addTitle = req.session.titleData;
																																					if (!addTitle) {
																																													res.redirect('/title/add')
																																					}
				Actor.find({})
												.exec((err , result) => {
																										res.render('form/title-actor-add' , {'title' : 'Add Actor' , 'movieTitle' : 'Odunlade Adekola' , 'actors' : result});
																						})
																			
	},

	'titleAddActorP' : (req , res) => {		addTitle = req.session.titleData;
																																						addTitle.cast = req.body.cast;
																																																						var body = addTitle;
		axios({
  					'method': 'post' ,
  															'url' : 'http://limitless-stream-60828.herokuapp.com/api/title/' ,
  															 																							'data' : body
  										}).then((response) => { 

													})

												.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status})		});
	},

	
	'titleUpdateActor' : (req , res) => {

				Actor.find({})
												.exec((err , result) => {
																										res.render('form/title-actor-add' , {'title' : 'Update Actor' , 'actors' : result});
																						})
	},

/*
	'titleDeleteActor' : (req , res) => {
																						res.render('delete/title-actor-delete' , {'title' : 'Remove Actor' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleDeleteActorP' : (req , res) => {
																						res.render('title');
	},

	'titleAddGenre' : (req , res) => {
																						res.render('form/title-genre-add' , {'title' : 'Add Genre' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleAddGenreP' : (req , res) => {
																						res.render('title');
	},

	'titleUpdateGenre' : (req , res) => {
																						res.render('form/title-genre-add' , {'title' : 'Update Genre' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleUpdateGenreP' : (req , res) => {
																						res.render('title');
	},

	'titleDeleteGenre' : (req , res) => {
																						res.render('delete/title-genre-delete' , {'title' : 'Remove Genre' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleDeleteGenreP' : (req , res) => {
																						res.render('title');
	},

	*/

	'titleDelete' : (req , res) => { tDetail = req.params.title , url = String('http://limitless-stream-60828.herokuapp.com/api/title/name/' + tDetail);
		

		axios.get(url).then((response) => { 	data = response.data.status;
																																				if (!data) {
																																											console.log(data);
																																																					return;		}
																																						else {
																																										res.render('delete/title-delete' , {'title' : 'Remove Title' , 'tData' : data});
																																																																																				}})
									.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	},

	'titleDeleteP' : (req , res) => {		tDetail = req.params.title; 

				axios({	'url' : 'http://limitless-stream-60828.herokuapp.com/api/title/' + tDetail ,
																																				'method' : 'delete' })				
				.then((response) => { 	data = response.data.status;
																																res.redirect('/title')		})
				.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	},

	'titleUpdate' : (req , res) => {		tDetail = req.params.title , url = 'http://limitless-stream-60828.herokuapp.com/api/title/' + tDetail + '/update';

		axios.get(url).then((response) => { title = response.data.status.Title; data = response.data.status ,	genre = data.Genre ,	country = data.Country , year = data.Year ,

																				language = data.Language , studio = data.Studio , tData = data.Title;

					res.render('form/title-add' , {'title' : 'Update Title ' + title.title,	'genres' : genre , 'countries' : country , 'year' : year , 'languages' : language,	'studios' : studio , 'tData' : tData});		})
										
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
				body('plot'											, 	'Plot must be uploaded.')																.isLength({ min: 1 }).trim(),
				
				sanitizeBody('*').trim().escape(),

			(req , res , next) => { 	var pData = [], tData = [], cData = [] , title = '';

			console.log(req.body);
																																											const errors = validationResult(req);
			tSet.arrangeFiles(fs , req , path , pData , tData , cData);
																																		tSet.createTitle(req.body , addTitle);
																																																						req.session.tData = addTitle;
																																																																								preTitle = req.session.tData;
																																														title = new Title(preTitle);
			if (!errors.isEmpty()) {
																url = String('http://limitless-stream-60828.herokuapp.com/api/title/add');

			axios.get(url).then((response) => { 	
																					if (err) { 	return next(err); }
		
					data = response.data.status ,	genre = data.Genre ,	country = data.Country , year = data.Year , language = data.Language , studio = data.Studio;

					res.render('form/title-add' , {'title' : 'Add Title' ,	'genres' : genre , 'countries' : country , 'year' : year , 'languages' : language,	'studios' : studio , 

										 'titleData' : title , 'errors' : errors.array()});
					
																	});			}
       			 																	else {	

       			 																					var pTitle = req.body.title.split(' ').join('-') , pUrl = req.params.title.split('-').join(' ');



       			 																					res.redirect('/title/name/actor/update/');		
       			 																	};
	}],

	'titleUpdateActorP' : (req , res) => {	tDetail = req.session.tData.title.toLowerCase().split(' ').join('-');

				addTitle = req.session.tData;
													
																		var body = addTitle;
		axios({
  					'method': 'put' ,
  															'url' : 'http://limitless-stream-60828.herokuapp.com/api/title/' + tDetail,
  															 																												'data' : body
  										}).then((response) => { 

													})
		
												.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})			});
	},

}
