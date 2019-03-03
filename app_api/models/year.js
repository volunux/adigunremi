var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var yearSchema = new Schema({
															'year' : {
																					'type' : Number,
																														'minlength' : 0,
																																							'required' : true ,
																																																	'maxlength' : 30
																	}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});



module.exports = mongoose.model('Year' , yearSchema);