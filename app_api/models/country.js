var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var countrySchema = new Schema({
																	'country' : {
																									'type' : String,
																																	'minlength' : 1,
																																										'required' : true,
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

countrySchema
							.virtual('url')
															.get(function () {
  																								return '/country/' + this.country;
				});

module.exports = mongoose.model('Country' , countrySchema);