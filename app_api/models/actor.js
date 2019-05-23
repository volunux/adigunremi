var mongoose = require('mongoose'),		Schema = mongoose.Schema , slug = require('mongoose-slug-updater') , mongoSlug = require('mongoose-url-slugs') , slugHero = require('mongoose-slug-hero') , 

moment = require('moment-timezone');

var photoSchema = new Schema({
			
'filename' : {	'type' : String ,		'maxlength' : 30	} ,		'path' : {				'type' : String ,		'default' : 'c:/'		} ,	 'size' : { 'type' : String , 'default' : 0 } ,
			
'mimetype' : {	'type' : String 	} ,												'encoding' : {		'type' : String }																});


var actorSchema = new Schema({
																'name' : String ,

																									'nickname' : String ,
																																					'occupation' : {	'type' : String,
																																																							'default' : 'nil',
																																																																	'maxlength' : 50		},
				'date_of_birth' : {	'type' : Date,
																						'default' : Date.now 	},
																																			'gender' : String ,
																																													'nationality' : {
																																																							'type' : Schema.Types.ObjectId ,	
																																																																								'ref' : 'Nationality' , 
																																																																																				'autopopulate' : true 	} ,	
																																																										
																																														'place_of_birth' : {	'type' : String ,
																																																																		'maxlength' : 30	} ,
				'country_of_origin' : {	
																	'type' : Schema.Types.ObjectId ,	
																																		'ref' : 'Nationality' ,
																																														'autopopulate' : true 	} ,	
																																														
																																																'state_of_origin' : {	'type' : String,
																																																																			'required' : true,
																																																																													'maxlength' : 15	},
				'networth' : {	'type' : String,
																					'default' : 'Undisclosed'		},
																																					'spouse_or_partner' : String ,
				'sp_facebook' : {
													'type': String ,
																						get : (url) => {
																															if (!url) {
																																						return url;		}
																																	else {
																																					if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
																																																																								url = 'http://' + url;	}
																																																																																						return url;		}	} } ,

				'sp_twitter' : {
													'type': String ,
																						get : (url) => {
																															if (!url) {
																																						return url;		}
																																	else {
																																					if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
																																																																								url = 'http://' + url;	}
																																																																																						return url;		}	} } ,
				'sp_instagram' : {
														'type': String ,
																							get : (url) => {
																																if (!url) {
																																							return url;		}
																																		else {
																																						if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
																																																																									url = 'http://' + url;	}
																																																																																							return url;		}	} } ,

				'sp_others' : String,
																'biography' : {	'type' : String,
																																	'maxlength' : 5000 ,
																																												'required' : true	} ,


										'cover_image' : photoSchema	,

																									'contact_email' : {	'type' : String ,
																																												'default' : 'none' ,
																																																							'maxlength' : 70		} ,

																									'contact_number' : {	'type' : String ,
																																													'default' : 'none' ,
																																																								'maxlength' : 70		} ,

																									'business' : {	'type' : String ,
																																												'default' : 'none' ,
																																																							'maxlength' : 70		} ,
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

actorSchema.plugin(require('mongoose-autopopulate'));

mongoose.plugin(slug , options);

actorSchema
						.virtual('dOb_ftd')
																.get(function () {
  																										return this.date_of_birth ? moment(this.date_of_birth).format('DD-MM-YYYY') : '';
				});


module.exports = mongoose.model('Actor' , actorSchema);
