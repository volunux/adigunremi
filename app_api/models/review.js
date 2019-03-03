var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var reviewSchema = new Schema({
																	'author' : {
																								'type' : String ,
																																		'maxlength' : 30 ,
																																												'required' : true
																	},
																				'rating' : {
																											'type' : Number ,
																																					'max' : 1 ,
																																												'default' : 0
																				},
																							'timestamp' : {
																																'type' : Date ,
																																									'default' : Date.now
																							},
																									'review_text' : {
																																		'type' : String ,
																																												'maxlength' : 100
																									}
});

module.exports = reviewSchema;