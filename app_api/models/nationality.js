var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var nationalitySchema = new Schema({
																			'num_code' : {
																											'type' : Number ,
																																				'maxlength' : 4,
																																													'required' : true ,
																																																							'minlength' : 1		} ,
																			'alpha_2_code' : {
																													'type' : String ,
																																						'maxlength' : 5 ,
																																															'required' : true,
																																																									'minlength' : 1 ,
																																																																		'uppercase' : true 	} ,
																			'alpha_3_code' : {
																													'type' : String ,
																																						'maxlength' : 6 ,
																																															'required' : true,
																																																									'minlength' : 1 ,
																																																																		'uppercase' : true } ,
																			'country_of_origin' : {
																															'type' : String ,
																																								'maxlength' : 45 ,
																																																	'required' : true ,
																																																											'minlength' : 1	} ,

																			'nationality' : {
																												'type' : String ,
																																					'maxlength' : 45 ,
																																															'required' : true ,
																																																									'minlength' : 1	}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});


module.exports = mongoose.model('Nationality' , nationalitySchema);