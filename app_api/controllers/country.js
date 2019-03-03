var Country = require('../models/country') , 	Title = require('../models/title') , config = require('../../app_server/config/config') , async = require('async') , cValue = '' , cParam = '' ,

country = '';

module.exports = {

	'countryName' : (req , res) => {	cValue = req.params.country;
			
		Country.findOne({'country' : new RegExp(cValue, 'i')})
																													.exec((err , countryName) => {
																																												if (err) {
																																																							config.response(res , 404 , err);
																																																																									return;	}
																																												if (!countryName) {
																																																							config.response(res , 404 , {'message' : 'Country cannot be found'});
																																																																																										return;	}
																																																							config.response(res , 200 , genreResult);																					});
	},

	'countryList' : (req , res) => {
																	
			Country.find({})
											.exec(function(err , countryResult) {
																																											if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																											if (!countryResult) {
																																																						config.response(res , 404 , {'message' : 'Countries cannot be found'});
																																																																																										return;	}
																																																						config.response(res , 200 , countryResult);																					});
	},

	'countryDetail' : (req , res) => {	cValue = req.params.country;	

			if (req.params && req.params.country) {
		
		async.waterfall([
			
			(callback) => {
																Country.findOne({'country' : new RegExp(cValue, 'i')}).exec((err , countryResult) => {
																																																													callback(null , countryResult);		});
																																																					},
			(arg1 , callback) => {
																Title.find({'production_countries' : config.id(arg1._id)})
																																													.exec((err , titleResult) => {
																																																													callback(null , titleResult);			})
																																																					}],
			(err , finalResult) => {
																if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this country'});
																																																																						return;		}
																												config.response(res , 200 , finalResult);																																																});
													} else {
																												config.response(res , 404 , {'message' : 'No Country id found'});			}	
			},

	'countryAdd' : (req , res) => {		cValue = req.body ,	country = new Country(cValue);
		
			country.save(function(err , countryResult) {
																										if (err) {
																																config.response(res , 404 , err);
																																																	return;	}
																														
																																config.response(res , 200 , countryResult);																																											});
	},

	'countryUpdate' : (req , res) => {	cValue = req.body, cParam = req.params.country;

		if (req.params && req.params.country) {
			
			Country.findOneAndUpdate({'country' : new RegExp(cParam, 'i')} , {'country' : cValue} , function(err) {
																																																							if (err) {
																																																													config.response(res , 404 , err);
																																																																														return;	}

																																																													config.response(res , 201 , {'message' : 'Successful request.'});		});
							} else {
																																																													config.response(res , 404 , {'message' : 'No Country id found'});		}
	},

	'countryDelete' : (req , res) => {	cParam = req.params.country;

		if (req.params && req.params.country) {
			
			Country.findOneAndRemove({'country' : new RegExp(cParam, 'i')} , function(err) {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																			return;		}

																																																		config.response(res , 204 , {'status' : 'Successful request.'});														});
									} else {
																																																		config.response(res , 404 , {'message' : 'No Country id found'});			}
		}
}