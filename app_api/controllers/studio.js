var config = require('../../app_server/config/config') , Studio = require('../models/studio') , async = require('async') , sValue = '' , sParam = '' , studio = '';


module.exports = {

	'studioName' : (req , res) => {		sValue = req.params.studio;
	
		Studio.findOne({'url' : new RegExp(sValue, 'i')})
																											.exec((err , studioName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!studioName) {
																																																						config.response(res , 404 , {'message' : 'Studio cannot be found'});
																																																																																									return;	}
																																																						config.response(res , 200 , studioName);																					});
	},

	'studioList' : (req , res) => {
		
		Studio.find({}).exec((err , studioResult) => {
																										if (err) {
																																					config.response(res , 404 , err);
																																																						return;	}
																										if (!studioResult) {
																																					config.response(res , 404 , {'message' : 'Studios cannot be found'});
																																																																								return;	}
																																					config.response(res , 200 , studioResult);																				});				
	},

	'studioDetail' : (req , res) => {	sValue = req.params.studio;
		
				if (req.params && req.params.studio) {

		Studio.findOne({'url' : new RegExp(sValue, 'i')})
																											.exec((err , studioResult) => {
																																												if (err) {
																																																							config.response(res , 404 , err);
																																																																								return;	}
																																												if (!studioResult) {
																																																							config.response(res , 404 , {'message' : 'Studio Info cannot be found'});
																																																																																												return;	}
																																																							config.response(res , 200 , studioResult);													});
									} else {
														config.response(res , 404 , {'message' : 'No Studio id found'});		}
	},

	'studioTitle' : (req , res) => { 	sValue = req.params.studio;

						if (req.params && req.params.studio) {
		
		async.waterfall([
											(callback) => {
																									Studio.findOne({'name' : new RegExp(sValue, 'i')}).exec((err , studioResult) => {
																																																																					callback(null , studioResult);			});
																																																									},
											(arg1 , callback) => {
																									Title.find({'production_companies' : config.id(arg1._id)})
																																																						.exec((err , titleResult) => {
																																																																						callback(null , titleResult);						});
																																															}],
											(err , studioResult) => {
																									if (err) {
																																	config.response(res , 404 , err);
																																																				return;	}
																							if (!studioResult) {
																																	config.response(res , 404 , {'message' : 'Titles not available for this studio'});
																																																																											return;		}
																																	config.response(res , 200 , studioResult);																																		});
							} else {
												config.response(res , 404 , {'message' : 'No Studio and Title id found'});		}
	},

	'studioAdd' : (req , res) => {	sValue = req.body ,	studio = new Studio(sValue);

		studio.save((err , studioResult) => {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , studioResult);																																				});
	},

	'studioUpdate' : (req , res) => {		sValue = req.body , sParam = req.params.studio;

				if (req.params && req.params.studio) {

		Studio.findOneAndUpdate({'url' : new RegExp(sParam, 'i')} , sValue , (err) => {
																																											if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});						});
							} else {
													config.response(res , 404 , {'message' : 'No Studio id found'});		}
	},

	'studioDelete' : (req , res) => {	 sParam = req.params.studio;

				if (req.params && req.params.studio) {
		
		Studio.findOneAndRemove({'url' : new RegExp(sParam, 'i')} , (err) => {
																																						if (err) {
																																											config.response(res , 404 , err);
																																																												return;	}

																																											config.response(res , 204 , {'message' : 'Successful request.'});														});
							} else {
												config.response(res , 404 , {'message' : 'No Studio id found'});		}
	}

}