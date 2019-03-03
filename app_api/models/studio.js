var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var photoSchema = new Schema({
																'originalname' : {	'type' : String,	
																																		'required' : true 	},
																																														'path' : String,
																																																							'type' : String, 
																																																																'encoding' :  String																																								
													});

var studioSchema = new Schema({
																'name' : {	'type' : String,
																															'required' : true,
																																									'maxlength' : 30	},
																																																				'year_founded' : {	'type' : Number,
																																																																							'maxlength' : 5	},
		'country_of_origin' : String,
																		//'cover_image' : [photoSchema],
																																		'about' : {	'type' : String,
																																																	'maxlength' : 2000	}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

studioSchema
						.virtual('url')
														.get(function () {
  																							return String(this.name).toLowerCase().split(' ').join('-');
				});


module.exports = goal = mongoose.model('Studio' , studioSchema);

