var Misc = require('../models/misc') , 		config = require('../../app_server/config/config');

module.exports = {

	'miscList' : (req , res) => {	
																	Misc.find({}).exec(function(err , misc) {
																																								if (err) {
																																															console.log('An error has occured');
																																																																		return;
																																					}
																																										config.response(res , 200 , misc);
																	});																			
	},

	'miscDetail' : (req , res) => {
																		var title = req.params.title;
																																		var ctitle = title.split('-').join(' ');
																																																								if (req.params && req.params.title) {
					Misc.findOne({'name' : ctitle}).exec(function(err , mone) {
																																				if(!mone) {
																																											config.response(res , 404 , {'message' : 'title cannot be found'});
																																																																														return;
																																																																																				}
																																				if (err) {
																																											config.response(res , 404 , err);
																																																													return;
																																																																			}
																																											config.response(res , 200 , mone); 
																																					});

																																				}	else {
																																											config.response(res , 404 , {'message' : 'no title provided'});
																																}

	},

	'miscAdd' : (req , res) => {
																	var mvalue = req.body,
																													misc = new Misc(mvalue);
																																											misc.save(function(err , mresult) {
																																																														if (err) {
																																																																									console.log('Error has occured');
																																																																				return;
																																																																		}
																																															config.response(res , 200 , mresult);

																																											});
}

}