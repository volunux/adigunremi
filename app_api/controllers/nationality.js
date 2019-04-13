var Genre = require('../models/genre') , Title = require('../models/title') , Studio = require('../models/studio') , Actor = require('../models/actor') ,	Nationality = require('../models/nationality') ,

config = require('../../app_server/config/config') , async = require('async') , nValue = '' , nationality = '' , nParam = '';


module.exports = {

	'nationalityList' : (req , res) => {
		
		Nationality.find({}).exec(function(err , nationalityResult) {
																																											if (err) {
																																																									config.response(res , 404 , err);
																																																																											return;	}
																																											if (!nationalityResult) {
																																																									config.response(res , 404 , {'message' : 'Nationality cannot be found'});
																																																																																														return;	}
																																																									config.response(res , 200 , nationalityResult);																					});				
	},

	'nationalityAdd' : (req , res) => {	nValue = req.body , nationality = new Nationality(nValue);
		
			nationality.save((err , nationalityResult) => {
																											if (err) {
																																	config.response(res , 404 , err);
																																																		return;	}
																																	
																																	config.response(res , 200 , nationalityResult);		});
	},

	'nationalityDetail' : (req , res) => {		nValue = req.params.nationality;	

				if (req.params && req.params.nationality) {
																			
			async.waterfall([
				
				(callback) => {
																Nationality.findOne({'nationality' : nValue})
																																									.exec((err , nationalityResult) => {
																																																												callback(null , nationalityResult);	});
																																																	},
				(arg1 , callback) => {
																Title.find({'released_date' : config.id(arg1._id)})
																																										.exec((err , nationalityResult) => {
																																																													callback(null , nationalityResult);		})
																																														}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this nationality'});
																																																																								return;		}
																												config.response(res , 200 , finalResult);																																														});
																			} else {
																									config.response(res , 404 , {'message' : 'No Nationality id found'});		}
	},
	
}