var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var trailerSchema = new Schema({
																	'name' : {
																								'type' : String ,
																																		'maxlength' : 30 ,
																	},
																				'path' : {
																											'type' : String ,
																																					'max' : 1 ,
																																												'default' : 'c:/'
																				},
																							'type' : {
																																'type' : String 
																							},
																									'encoding' : {
																																		'type' : String
																									}
});

module.exports = trailerSchema;