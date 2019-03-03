var Language = require('../models/language') , 	config = require('../../app_server/config/config') , async = require('async') , Title = require('../models/title'),

mongoose = require('mongoose');

module.exports = {

	'languageName' : (req , res) => {

		var lvalue = req.params.language;
																			Language.findOne({'language' : new RegExp(lvalue, 'i')})
																																																.exec((err , languageName) => {
																																																																if (err) {
																																																																						config.response(res , 404 , {'message' : 'not found'});
																																																											}
																																					config.response(res , 200 , languageName);
																																		})
	},

	'languageList' : (req , res) => {
																			
		Language.find({}).exec(function(err , language) {
																												if (err) {
																																		console.log('An error has occured');
																																																					return;
																																						}
																																																									config.response(res , 200 , language);
																	});				
	},

	'languageAdd' : (req , res) => {
																	
		var lvalue = req.body,
														newLanguage = new Language(lvalue);
																																newLanguage.save(function(err , lresult) {
																																																						if (err) {
																																																												console.log('An Error occured');
																																																																													return;
																																																																			}
				config.response(res , 201 , lresult);
																								});
	},

	'languageDetail' : (req , res) => {
	
		var lvalue = req.params.language;
																			
				async.waterfall([
						
					(callback) => {
																	Language.findOne({'language' : new RegExp(lvalue, 'i')}).exec((err , lresult) => {
																																																																callback(null , lresult);
																																																												});
																												},
					(arg1 , callback) => {
																	Title.find({'language' : config.id(arg1._id)})
																																																.populate('language')
																																																
																																																.populate('production_countries')

																																																.populate('production_companies')

																																																.populate('cast')

																																																.populate('credits')

																																																.populate('spoken_languages')

																																																.populate('year')

																																																.exec(function(err , tresult) {
																																																																	callback(null , tresult);
																																								})
																									}],
																												function(err , result) {
																																									config.response(res , 200 , result);
																																				});
	},


	'languageUpdate' : (req , res) => {		var lvalue = req.body.language , lparam = req.params.language;

		Language.findOneAndUpdate({'language' : new RegExp(lparam, 'i')} , {'language' : lvalue} , (err) => {
																																																						if (err)  {
																																																													console.log('An Error occured');
																																																																														return;		}
																																			config.response(res , 200 , {result : 'good'});
																																																													})
	},

	'languageDelete' : (req , res) => {		var lparam = req.params.language;
		
		Language.findOneAndRemove({'language' : new RegExp(lparam, 'i')} , (err) => {
																																									if (err) {
																																															console.log('An Error has occured');
																																																																		return;	}
																																																																								config.response(res , 204 , {'message' : 'success'});
																																		});
	},

	'languageTitle' : (req , res) => {
																				config.response(req , res);
	}

}