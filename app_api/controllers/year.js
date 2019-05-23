var Genre = require('../models/genre') , Title = require('../models/title') , Studio = require('../models/studio') , Actor = require('../models/actor') ,	Year = require('../models/year') ,

config = require('../../app_server/config/config') , async = require('async') , yValue = '' , year = '' , yParam = '';


module.exports = {

	'yearList' : (req , res) => {
		
		Year.find({}).exec(function(err , yearResult) {
																																											if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																											if (!yearResult) {
																																																						config.response(res , 404 , {'message' : 'Year cannot be found'});
																																																																																									return;	}
																																																						config.response(res , 200 , yearResult);																					});				
	},

	'yearAdd' : (req , res) => {	yValue = req.body , year = new Year(yValue);
		
			year.save((err , yearResult) => {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , yearResult);		});
	},

	'yearDetail' : (req , res) => {		yValue = req.params.year;	

				if (req.params && req.params.year) {
																			
			async.waterfall([
				
				(callback) => {
																Year.findOne({'year' : yValue})
																																									.exec((err , yearResult) => {
																																																									callback(null , yearResult);	});
																																																	},
				(arg1 , callback) => {
																if(arg1 === null) {		arg1 = {};
																																	arg1['_id'] = 2233232		}
																																															year = arg1['_id'];					
																Title.find({'released_date' : year})
																																										.exec((err , yearResult) => {
																																																									callback(null , yearResult);		})
																																														}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this year'});
																																																																					return;		}
																												config.response(res , 200 , finalResult);																																														});
																			} else {
																									config.response(res , 404 , {'message' : 'No Year id found'});		}
	},
	
}