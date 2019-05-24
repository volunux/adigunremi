var config = require('../../app_server/config/config') , async = require('async'), Title = require('../models/title') , title = '' , Actor = require('../models/actor') ,

Studio = require('../models/studio'), Genre = require('../models/genre'), Country = require('../models/country') , Year = require('../models/year') , Language = require('../models/language');

module.exports = {

	'titleName' : (req , res) => {	var tvalue = req.params.title.split('-').join(' ');

		Title.findOne({'title' : new RegExp(tvalue, 'i')})
																											.exec((err , titleName) => {
																																										if (err) {
																																																config.response(res , 404 , {'message' : 'not found'});
																																												}
																																																config.response(res , 200 , titleName);
																																		})
	} ,

	'title' : (req , res) => {
		
		Title.find({})
									.exec((err , titlesResult) => {
																										if (err) {
																																					config.response(res , 404 , err);
																																																						return;	}
																										if (!titleResult) {
																																					config.response(res , 404 , {'message' : 'Titles cannot be found'});
																																																																								return;		}
																																					config.response(res , 200 , titlesResult);
																						});
	},

	'titleList' : (req , res) => {
		
		Title.find({})
										.exec((err , titlesResult) => {
																										if (err) {
																																					config.response(res , 404 , err);
																																																						return;	}
																										if (!titlesResult) {
																																					config.response(res , 404 , {'message' : 'Titles cannot be found'});
																																																																								return;		}
																																					config.response(res , 200 , titlesResult);
																								})
	},

	'titleDetail' : (req , res) => {	title = req.params.title;

		if (req.params && req.params.title) {
			
			Title.findOne({'url' : new RegExp(title, 'i')})
																												.exec((err , titleResult) => {
																																														if (err) {
																																																									config.response(res , 404 , err);
																																																																										return;	}
																																														if (!titleResult) {
																																																									config.response(res , 404 , {'message' : 'Title cannot be found'});
																																																																																												return;	}
																																																									config.response(res , 200 , titleResult);
																																												})		}		else {
																																																									config.response(res , 404 , {'message' : 'No Title Id Found'});
																																																						}
	},

	'titleAdd' : (req , res) => {	var titleBody = req.body , newTitle = new Title(titleBody);
			
			newTitle.save((err) => {
																if (err) {
																						config.response(res , 400 , err);
																}	else {
																						config.response(res , 200 , {'message' : 'success'});
																}
																																															})
	},

	'titleAddPage' : (req , res) => {
		
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
			} , (err , result) => {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																															return;		}
																											config.response(res , 200 , result);
																})
	},

	'titleTrailer' : (req , res) => {		title = req.params.title;	

		if (req.params && req.params.title) {
		
				async.parallel({
													'Title' : (callback) => {
																											Title.findOne({'url' : new RegExp(title, 'i')})
																																																				.select('trailer title')
																																																																.exec(callback)		}
			}, (err , result) => {
															if (err) {
																							config.response(res , 404 , {'message' : 'Trailer not available'});
																																																										return;	}
															if (!result) {
																							config.response(res, 404 , {'message' : 'Trailer not available'});
																																																									return;		}																												
															if (result.Title == null) {

																							config.response(res, 404 , {'message' : 'Trailer not available'});
																																																									return;		}
																							config.response(res , 200 , result);
																			});	}
				else {
								config.response(res , 404 , {'message' : 'No title id provided'})
				}
	},

	'titlePhoto' : (req , res) => {		title = req.params.title;

		if (req.params && req.params.title) {
 
			async.parallel({
												'Title' : (callback) => {
																										Title.findOne({'url' : new RegExp(title, 'i')})
																																																				.select('photo title')
																																																															.exec(callback)		}
			}, (err , result) => {
															if (err) {
																							config.response(res , 404 , err);
																																									return;	}
															if (!result) {
																							config.response(res, 404 , {'message' : 'Photos not available'});
																																																									return;		}				
															if (result.Title == null) {

																							config.response(res, 404 , {'message' : 'Photos not available'});
																																																									return;		}																								
																							config.response(res , 200 , result);
																			});		}
			else {
								config.response(res , 404 , {'message' : 'No title id provided'});
			}	
	},

	'titleCredits' : (req , res) => {
																				config.response(req , res);
	},

	'titleCast' : (req , res) => {	title = req.params.title;

		if (req.params && req.params.title) {

			async.parallel({
												'Title' : (callback) => {
																										Title.findOne({'url' : new RegExp(title, 'i')}).populate('cast')
																																																													.select('cast title')
																																																																									.exec(callback)		}
			}, (err , result) => {
															if (err) {
																							config.response(res , 404 , err);
																																									return;	}
															if (!result) {
																							config.response(res, 404 , {'message' : 'Cast not available'});
																																																									return;		}				
															if (result.Title == null) {

																							config.response(res, 404 , {'message' : 'Cast not available'});
																																																									return;		}																								
																							config.response(res , 200 , result);
																			});		}
			else {
							config.response(res , 404 , {'message' : 'No title id provided'})
			}
	},

	'titleReviews' : (req , res) => {
			
			var tReviews = req.params.title.split('-').join(' ');
			
			Title.findOne({'title' : new RegExp(tReviews, 'i')})
																														.select('reviews title')
																																											.exec((err , result) => {
														if (err) {
																							config.response(res , 404 , err);
																																									return;	}
															if (!result) {
																							config.response(res, 404 , {'message' : 'Reviews not available'});
																																																									return;		}																												
																							config.response(res , 200 , result);
																			});	

	},

	'titleAddReview' : (req , res) => {	var reviewBody = req.body ,	reviewTitleAdd = req.params.title;
			
			Title.findOne({'url' : new RegExp(reviewTitleAdd , 'i')})
																																	.exec((err , result) => {
																																															result.reviews.push(reviewBody);
				result.save((err , result) => {
																				if (err) {

																					console.log(err);

																										config.response(res , 400 , err);
																																													return;	}
																										config.response(res , 200 , result);
																			});	
																									})
	},

	'titleDelete' : (req , res) => {	var title = req.params.title;
		
		Title.findOneAndRemove({'url' : new RegExp(title , 'i')} , function(err) {
																																									if (err) {
																																															config.response(res , 404 , err);
																																																																return;		}

																																															config.response(res , 204 , {'message' : 'success'});
																																		})
	},

	'titleUpdate' : (req , res) => {	title = req.params.title;

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
																									},

																									'Title' : (callback) => {
																																							Title.findOne({'url' : new RegExp(title, 'i')})
																																																																.exec(callback) }	
			}, function(err , result) {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																															return;		}
																											config.response(res , 200 , result);
																})
	},

	'titleUpdateP' : (req , res) => {		

		var tvalue = req.body , tparam = req.params.title;

			Title.findOneAndUpdate({'url' : new RegExp(tparam, 'i')} , tvalue , (err) => {
																																												if (err)  {
																																																			config.response(res , 404 , err);
																																																																					return;	}
																																																		console.log('success');

																																																			config.response(res , 200 , {result : 'good'});
																																							});
	},

	'titleAddActor' : (req , res) => {
																				config.response(req , res);
	},

	'titleUpdateActor' : (req , res) => {	title = req.params.title;

																async.parallel({
																									'Actor' : (callback) => {
																																											Actor.find({}).exec(callback);
																									} ,

																									'Title' : (callback) => {
																																							Title.findOne({'url' : new RegExp(title, 'i')})
																																																																.exec(callback) }	
			}, function(err , result) {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																															return;		} 
																											config.response(res , 200 , result);
																})

	},

	'titleDeleteActor' : (req , res) => {
																				config.response(req , res);
	},

	'titleAddGenre' : (req , res) => {
																				config.response(req , res);	},

	'titleUpdateGenre' : (req , res) => {
																				config.response(req , res);
	},

	'titleDeleteGenre' : (req , res) => {
																				config.response(req , res);
	}


}