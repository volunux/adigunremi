var config = require('../../app_server/config/config') , Actor = require('../models/actor') , async = require('async') , aSet = require('../config/actor') , aValue = '' , aParam = '';


module.exports = {

	'actorName' : (req , res) => {	aValue = req.params.actor.split('-').join(' ');
			
			Actor.findOne({'name' : new RegExp(aValue, 'i')})
																												.exec((err , actorName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!actorName) {
																																																						config.response(res , 404 , {'message' : 'Actor cannot be found'});
																																																																																									return;	}
																																																						config.response(res , 200 , actorName);																						});
	},

	'actorList' : (req , res) => {
		
			Actor.find({}).exec(function(err , actorResult) {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!actorResult) {
																																																						config.response(res , 404 , {'message' : 'Actors cannot be found'});
																																																																																									return;	}
																																																						config.response(res , 200 , actorResult);																					});				
	},

	'actorListM' : (req , res) => {

			Actor.find({'gender' : new RegExp('male', 'i')}).exec(function(err , actorResult) {
																																														if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!actorResult) {
																																																						config.response(res , 404 , {'message' : 'Actors cannot be found'});
																																																																																									return;	}
																																																						config.response(res , 200 , actorResult);																					});	
	},

	'actorListF' : (req , res) => {

			Actor.find({'gender' : new RegExp('female', 'i')}).exec(function(err , actorResult) {
																																														if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!actorResult) {
																																																						config.response(res , 404 , {'message' : 'Actors cannot be found'});
																																																																																									return;	}
																																																						config.response(res , 200 , actorResult);																					});	
	},

	'actorDetail' : (req , res) => {	aValue = req.params.actor.split('-').join(' ');
			
		if (req.params && req.params.actor) {

			Actor.findOne({'name' : new RegExp(aValue, 'i')}).exec((err , actorResult) => {
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

	'actorTitle' : (req , res) => {		aValue = req.params.actor.split('-').join(' ');

		if (req.params && req.params.actor) {

			async.waterfall([
				
				(callback) => {
																Actor.findOne({'name' : new RegExp(aValue, 'i')}).exec((err , actorResult) => {
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

	'actorAdd' : (req , res) => {	aValue = req.body ,	actor = new Actor(aBody);

		if (req.body) {
			
					actor.save((err , actorResult) => {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , actorResult);																																													});
		}		else {
								config.response(res , 404 , {'message' : 'No body provided'});
		}
	},

	'actorUpdate' : (req , res) => {	aValue = req.body , aParam = req.params.actor.split('-').join(' ');

			if (req.params && req.params.actor) {

			Actor.findOneAndUpdate({'name' : new RegExp(aParam, 'i')} , aValue , (err) => {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});												});
												} else {
																	config.response(res , 404 , {'message' : 'No Actor id found'});		}
	},

	'actorDelete' : (req , res) => {	aParam = req.params.actor.split('-').join(' ');
			
		if (req.params && req.params.actor) {
		
			Actor.findOneAndRemove({'name' : new RegExp(aParam, 'i')} , function(err) {
																																										if (err) {
																																																config.response(res , 404 , err);
																																																																	return;	}

																																																config.response(res , 204 , {'message' : 'Successful request.'});														});
												} else {
																	config.response(res , 404 , {'message' : 'No Actor id found'});		}
	}

}