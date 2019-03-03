const { body,validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Genre = require('../../app_api/models/genre'), Country = require('../../app_api/models/country'), Year = require('../../app_api/models/year'), Studio = require('../../app_api/models/studio'),

async = require('async') , Language = require('../../app_api/models/language') ,	Title = require('../../app_api/models/title') , Actor = require('../../app_api/models/actor') ,

fs = require('fs') , multer = require('multer') , path = require('path') , titleConfig = require('../config/title') ,	upload = multer({ storage: titleConfig.multer }) , addTitle = {};

var request = require('request') , reqOptions = {		'url' : 'http://localhost:3000/api/' ,
																																														'method' : 'GET' ,
																																																								'json' : {},
																																																															'qs' : {}		};
module.exports = {

	'title' : (req , res) => {

															reqOptions = {
																							'url' : 'http://localhost:3000/api/' ,
																																											'method' : 'GET' ,
																																																					'json' : {},
																																																												'qs' : {}
															};
																						request(reqOptions , (err , resBody , body) => {

																						})

	},

	'titleList' : (req , res) => {

			reqOptions.url = 'http://localhost:3000/api/title';
																														request(reqOptions , (err , resBody , body) => {
																																																									console.log(body);
																													})

	},

	'titleDetail' : (req , res) => {
		
		var tDetail = req.params.title.split('-').join(' ');
																														reqOptions.url = 'http://localhost:3000/api/title' + tDetail;
																																																														request(reqOptions , (err , resBody , body) => {
																																																																																							console.log(body);
																																																								})
		

	},

	'titleAdd' : (req , res) => {
																async.parallel({
																									'Genre' : (callback) => {
																																											Genre.find({}).exec(callback);
																									},

																									'Country' : (callback) => {
																																											Country.find({}).exec(callback);
																									},

																									'Year' : (callback) => {
																																											Year.find({}).exec(callback);
																									},

																									'Language' : (callback) => {
																																											Language.find({}).exec(callback);
																									},

																									'Studio' : (callback) => {
																																											Studio.find({}).exec(callback);
																									}
			}, function(err , result) {
																		res.render('form/title-add' , {'title' : 'Add Title' ,

																			'genres' : result.Genre , 'countries' : result.Country , 'year' : result.Year , 'languages' : result.Language ,	'studios' : result.Studio});

																})
	},

	'titleAddP' : [ upload.fields(titleConfig.uploadWare) , (req , res) => {

		console.log(req.files);
																																						var pData = [] , tData = [] , cData = [];
																																																													titleConfig.arrangeFiles(fs , req , path , pData , tData , cData);
			titleConfig.createTitle(req.body , addTitle);
																													req.session.titleData = addTitle;																								
									res.redirect('/title/name/actor/add/');
	}],

	'titleTrailer' : (req , res) => {
																			var tDetail = req.params.title.split('-').join(' ');
				
			async.parallel({
												'Title' : (callback) => {
																										Title.findOne({'title' : new RegExp(tDetail, 'i')})
																																																				.select('trailer')
																																																															.exec(callback)		}
			}, (err , result) => {
															console.log(result.Title);

															res.render('title-detail-trailer' , { 'title' : 'Aremi' ,	'title' : result.Title });		});	
	},

	'titlePhoto' : (req , res) => {
																						res.render('title-detail-photo' , {'title' : 'Photos' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleCredits' : (req , res) => {
																						res.render('title-detail-credit' , {'title' : 'Credits' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleCast' : (req , res) => {
																						res.render('title-detail-cast' , {'title' : 'Casts' , 'movieTitle' : 'Odunlade Adekola' ,
			'title_actor' : [
													{'name' : 'Odunlade Adekola' ,
																														'image' : '/images/one.jpg'},
													{'name' : 'Jide Kosoko' ,
																														'image' : '/images/one.jpg'},
													{'name' : 'Adekola Tijani' ,
																														'image' : '/images/one.jpg'},
													{'name' : 'Olaniyi Afonja' ,
																														'image' : '/images/one.jpg'}
																																															]
																				});
	},

	'titleReviews' : (req , res) => {
																						res.render('title-reviews' , {'title' : 'Reviews' , 'movieTitle' : 'Odunlade Adekola' ,
						'reviews' : [
											{
													'author' : 'Yusuf Musa Yusuf',
																													'ratings' : 3,
																																																																									'timestamp' : '22nd October 2018',
						'reviewText' : 'My name is Yusuf Musa Yusuf. I study Information and Media Technology at the Federal University of Technology Minna'
											},

											{
													'author' : 'Yusuf Musa Yusuf',
																													'ratings' : 3,
																																																																									'timestamp' : '22nd October 2018',
						'reviewText' : 'My name is Yusuf Musa Yusuf. I study Information and Media Technology at the Federal University of Technology Minna'
											
											},

											{
													'author' : 'Yusuf Musa Yusuf',
																													'ratings' : 3,
																																																																									'timestamp' : '22nd October 2018',
						'reviewText' : 'My name is Yusuf Musa Yusuf. I study Information and Media Technology at the Federal University of Technology Minna'
											
											},

											{
													'author' : 'Yusuf Musa Yusuf',
																													'ratings' : 3,
																																																																									'timestamp' : '22nd October 2018',
						'reviewText' : 'My name is Yusuf Musa Yusuf. I study Information and Media Technology at the Federal University of Technology Minna'
										
											} ]
																					});
	},

	'titleAddReview' : (req , res) => {
																						res.render('form/title-review-add' , {'title' : 'Add Review' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleAddReviewP' : (req , res) => {
																						res.render('title-detail');
	},

	'titleAddActor' : (req , res) => {

				Actor.find({})
												.exec((err , result) => {
																										res.render('form/title-actor-add' , {'title' : 'Add Actor' , 'movieTitle' : 'Odunlade Adekola' , 'actors' : result});
																						})
																			
	},

	'titleAddActorP' : (req , res) => {
			
			addTitle = req.session.titleData;

																				addTitle.cast = req.body.cast;
			console.log(addTitle);
																																					var body = addTitle,
													rOptions = {
																				'url' : 'http://localhost:3000/api/title' ,
																																											'method' : 'POST' ,
																																																					'json' : body ,
																																																													'qs' : {}			};
			request(rOptions , (err, response, body) => {
																											if (err) {
																																	console.log(err);
																																											} else if (response.statusCode === 200) {
																																																																	console.log(body);
																																																																											} else {
																																																																																console.log(response.statusCode);
																																																																									}
																																																																			});
	},

	'titleUpdateActor' : (req , res) => {
																						res.send('form/title-add-actor' , {'title' : 'Update Actor' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleUpdateActorP' : (req , res) => {
																						res.send('title');
	},

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

	'titleDelete' : (req , res) => {
																					res.render('delete/title-delete' , {'title' : 'Remove Title' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleDeleteP' : (req , res) => {
																					res.render('title');
	},

	'titleUpdate' : (req , res) => {
																					res.render('form/title-add' , {'title' : 'Update Title' , 'movieTitle' : 'Odunlade Adekola'});
	},

	'titleUpdateP' : (req , res) => {
																					res.render('title');
	}
}