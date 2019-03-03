var Genre = require('../models/genre') , Title = require('../models/title') , Studio = require('../models/studio') , Actor = require('../models/actor') ,

config = require('../../app_server/config/config') , async = require('async') , gValue = '' , genre = '' , gParam = '';

module.exports = {

	'genreName' : (req , res) => {	gValue = req.params.genre;
			
			Genre.findOne({'genre' : new RegExp(gValue, 'i')})
																													.exec((err , genreName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!genreName) {

																																																						config.response(res , 404 , {'message' : '404'});
																																																																																									return;		}
																																																						config.response(res , 200 , genreName);
																																		});
	},

	'genreList' : (req , res) => {	
																	Genre.find({})
																									.exec(function(err , genreResult) {
																																											if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																											if (!genreResult) {
																																																						config.response(res , 404 , {'message' : 'Genres cannot be found'});
																																																																																									return;		}
																																																						config.response(res , 200 , genreResult);
																						});
	},

	'genreDetail' : (req , res) => {		gValue = req.params.genre;	

				if (req.params && req.params.genre) {
																			
			async.waterfall([
				
				(callback) => {
																Genre.findOne({'genre' : new RegExp(gValue, 'i')})
																																									.exec((err , genreResult) => {
																																																									callback(null , genreResult);	});
																																																	},
				(arg1 , callback) => {
																Title.find({'genre' : config.id(arg1._id)})
																																						.exec((err , genreResult) => {
																																																									callback(null , genreResult);		})
																																														}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this genre'});
																																																																					return;		}
																												config.response(res , 200 , finalResult);																																														});
																			} else {
																									config.response(res , 404 , {'message' : 'No Genre id found'});		}
	},

	'genreAdd' : (req , res) => {		gValue = req.body , genre = new Genre(gValue);
			
			genre.save(function(err , genreResult) {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , genreResult);																																												});
	},

	'genreUpdate' : (req , res) => {	gValue = req.body.genre , gParam = req.params.genre;

					if (req.params && req.params.genre) {

			Genre.findOneAndUpdate({'genre' : new RegExp(gParam, 'i')} , gValue , (err) => {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});						});
													}
														else {
																			config.response(res , 404 , {'message' : 'No Genre id found'});		}
	},

	'genreDelete' : (req , res) => {	gParam = req.params.genre;

				if (req.params && req.params.genre) {

			Genre.findOneAndRemove({'genre' : new RegExp(gParam, 'i')} , function(err) {
																																											if (err) {
																																																	config.response(res , 404 , err);
																																																																		return;	}

																																																	config.response(res , 204 , {'message' : 'Successful request.'});														});
												} else {
																	config.response(res , 404 , {'message' : 'No Genre id found'});		}
	},

}