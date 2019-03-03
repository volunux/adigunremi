var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var genreSchema = new Schema({
																'genre' : {
																						'type' : String ,
																																'maxlength' : 20,
																																										'required' : true,
																																																				'minlength' : 1,
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

genreSchema
						.virtual('url')
														.get(function () {
  																							return '/genre/' + this.genre;
				});

module.exports = mongoose.model('Genre' , genreSchema);