var mongoose = require('mongoose'),		Schema = mongoose.Schema , moment = require('moment-timezone');

var photoSchema = new Schema({
																'originalname' : {	'type' : String ,
																																			'required' : true	},
																																														'path' : String,
																																																							'mimetype' : String, 
																																																																		'encoding' :  String																																								
													});

var actorSchema = new Schema({
																'name' : String ,

																									'nickname' : String ,
																																					'occupation' : {	'type' : String,
																																																							'default' : 'nil',
																																																																	'maxlength' : 50		},
				'date_of_birth' : {	'type' : Date,
																						'default' : Date.now 	},
																																			'gender' : String,
																																													'nationality' : String,
																																																										'place_of_birth' : {	'type' : String,
																																																																														'maxlength' : 30	},
				'country_of_origin' : {	'type' : String,
																									'required' : true,
																																			'maxlength' : 20	},
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
																																												'required' : true	}
										//'cover_image' : [photoSchema]	
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

actorSchema
						.virtual('url')
														.get(function () {
  																							return String(this.name).toLowerCase().split(' ').join('-');
				});

actorSchema
						.virtual('dOb_ftd')
																.get(function () {
  																										return this.date_of_birth ? moment(this.date_of_birth).format('DD-MM-YYYY') : '';
				});


module.exports = mongoose.model('Actor' , actorSchema);
