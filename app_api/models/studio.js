var mongoose = require('mongoose'),		Schema = mongoose.Schema , slug = require('mongoose-slug-updater') , mongoSlug = require('mongoose-url-slugs') , slugHero = require('mongoose-slug-hero') , 

moment = require('moment-timezone');

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
																		'cover_image' : photoSchema ,
																																		'about' : {	'type' : String,
																																																	'maxlength' : 2000	} ,
 														'url' : {
																				'type' : String ,
																														'slug' : 'name' ,
																																								'unique' : true ,
																																																	'slugPaddingSize' : 3		} 
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

var options = {

		'symbols' : false	,

			'custom' : {

					'$' : '#' ,
											'"' : '#' ,
																	'&' : '!' ,
																							'<' : '.' ,
																														'>' : '#' ,
																																					'?' : '#'

			}
}

studioSchema.plugin(require('mongoose-autopopulate'));

mongoose.plugin(slug , options);

module.exports = mongoose.model('Studio' , studioSchema);

