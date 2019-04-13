var config = require('../../app_server/config/config') , Actor = require('../models/actor') , Nationality = require('../models/nationality') , async = require('async') , aSet = require('../config/actor') ,

aValue = '' , aParam = '';


module.exports = {

	'actorName' : (req , res) => {	aValue = req.params.actor;
			
			Actor.findOne({'url' : new RegExp(aValue, 'i')})
																												.exec((err , actorName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}

																																																						config.response(res , 200 , actorName);																						});
	},

	'actorList' : (req , res) => {
		
			Actor.find({}).exec((err , actorResult) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!actorResult) {
																																																						config.response(res , 404 , {'message' : 'Actors cannot be found'});
																																																																																									return;	}
																																																						config.response(res , 200 , actorResult);																					});				
	},

	'actorListGender' : (req , res) => { var gender = req.params.gender;

			Actor.find({'gender' : new RegExp(gender , 'i')}).exec(function(err , actorResult) {
																																														if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!actorResult) {
																																																						config.response(res , 404 , {'message' : 'Actors cannot be found'});
																																																																																									return;	}
																																																						config.response(res , 200 , actorResult);																					});	
	},

	'actorDetail' : (req , res) => {	aValue = req.params.actor;
			
		if (req.params && req.params.actor) {

			Actor.findOne({'url' : new RegExp(aValue, 'i')}).exec((err , actorResult) => {
																																														if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!actorResult) {
																																																						config.response(res , 404 , {'message' : 'Actor Info cannot be found'});
																																																																																											return;	}
																																																						config.response(res , 200 , actorResult);																																	});
												} else {
																	config.response(res , 404 , {'message' : 'No Actor id found'});		}
			},

	'actorTitle' : (req , res) => {		aValue = req.params.actor;

		if (req.params && req.params.actor) {

			async.waterfall([
				
				(callback) => {
																Actor.findOne({'url' : new RegExp(aValue, 'i')}).exec((err , actorResult) => {
																																																									callback(null , actorResult);				});
																																												},
				(arg1 , callback) => {
																Title.find({'cast' : config.id(arg1._id)})
																																					.exec((err , titleResult) => {
																																																									callback(null , titleResult);		});
																																													}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this actor'});
																																																																						return;		}
																				
																												config.response(res , 200 , finalResult);																																															});
												} else {
																												config.response(res , 404 , {'message' : 'No Actor id found'});		}
	},

	'actorAddPage' : (req , res) => {
		
																async.parallel({
																									'Nationality' : (callback) => {
																																											Nationalityo.find({}).exec(callback);
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

	'actorAdd' : (req , res) => {	aValue = req.body ,	actor = new Actor(aValue);

		if (req.body) {
			
					actor.save((err , actorResult) => {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , actorResult);																																													});
		}		else {
								config.response(res , 404 , {'message' : 'No body provided'});		}
	} ,

	'actorUpdate' : (req , res) => {	aValue = req.body , aParam = req.params.actor;

			if (req.params && req.params.actor) {

			Actor.findOneAndUpdate({'url' : new RegExp(aParam, 'i')} , aValue , (err) => {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});												});
												} else {
																	config.response(res , 404 , {'message' : 'No Actor id found'});		}
	},

	'actorDelete' : (req , res) => {	aParam = req.params.actor;
			
		if (req.params && req.params.actor) {
		
			Actor.findOneAndRemove({'url' : new RegExp(aParam, 'i')} , function(err) {
																																										if (err) {
																																																config.response(res , 404 , err);
																																																																	return;	}

																																																config.response(res , 204 , {'message' : 'Successful request.'});														});
												} else {
																	config.response(res , 404 , {'message' : 'No Actor id found'});		}
	} ,

	'actorUpdatePage' : (req , res) => {	actor = req.params.actor;

																async.parallel({
																									'Nationality' : (callback) => {
																																											Nationality.find({}).exec(callback);
																									},

																									'Actor' : (callback) => {
																																											Actor.findOne({'url' : new RegExp(actor , 'i')})
																																																																				.exec(callback) }	
			}, (err , result) => {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																															return;		}
																											config.response(res , 200 , result);																																																			})
	}

}