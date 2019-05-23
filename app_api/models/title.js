var mongoose = require('mongoose'),		Schema = mongoose.Schema , slug = require('mongoose-slug-updater') , mongoSlug = require('mongoose-url-slugs') , slugHero = require('mongoose-slug-hero');

var reviewSchema = new Schema({
			
'author' : {			'type' : String ,			'maxlength' : 30 ,	'required' : true } ,				'rating' : {	'type' : Number ,		'max' : 5 ,		'default' : 0	} ,
			
'review_text' : {	'type' : String ,			'maxlength' : 100	} ,														'timestamp' : {	'type' : Date ,		'default' : Date.now 	} });

	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/	

var trailerSchema = new Schema({
			
'filename' : {	'type' : String ,		'maxlength' : 30 } ,		'path' : {			'type' : String ,		'default' : 'c:/'	} ,  			'size' : { 'type' : String , 'default' : 0 } ,
			
'mimetype' : {	'type' : String } ,													'encoding' : {	'type' : String 	}																});

	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/

var photosSchema = new Schema({
			
'filename' : {	'type' : String ,		'maxlength' : 30	} ,		'path' : {				'type' : String ,		'default' : 'c:/'		} ,	 'size' : { 'type' : String , 'default' : 0 } ,
			
'mimetype' : {	'type' : String 	} ,												'encoding' : {		'type' : String }																});

	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/

var photoSchema = new Schema({
			
'filename' : {	'type' : String ,		'maxlength' : 30	} ,		'path' : {				'type' : String ,		'default' : 'c:/'		} ,	 'size' : { 'type' : String , 'default' : 0 } ,
			
'mimetype' : {	'type' : String 	} ,												'encoding' : {		'type' : String }																});

	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/

var titleSchema = new Schema({
			
'title' : {	'type' : String ,	'required' : true ,	'maxlength' : 50	} ,	'running_time' : String ,		'released_date' : {	'type' : Schema.Types.ObjectId ,	'ref' : 'Year' ,	'autopopulate' : true } ,
			
'rating' : {	'type' : Number ,	'required' : false ,	'max' : 5 ,	'default' : 0	} ,	'director' : String ,	'producer' : {	'type' : String ,	'maxlength' : 40	} ,

	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/

'spoken_languages' : [{	'type' : Schema.Types.ObjectId ,	'ref' : 'Language' , 'autopopulate' : true 	}] ,		'genre' : [{	'type' : Schema.Types.ObjectId ,	'ref' : 'Genre' , 'autopopulate' : true }] ,	

	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/

'production_companies' : [{	'type' : Schema.Types.ObjectId ,	'ref' : 'Studio' , 'autopopulate' : true }] ,

'production_countries' : [{	'type' : Schema.Types.ObjectId ,	'ref' : 'Country' , 'autopopulate' : true	}] ,	'budget' : String ,	'revenue' : String ,	'sypnosis' : String ,

	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/

'cover_image' : [photoSchema] , 'photo' : [photosSchema] , 	'trailer' : trailerSchema , 'cast' : [{	'type' : Schema.Types.ObjectId ,	'ref' : 'Actor' ,  'autopopulate' : true }] ,

'reviews' : [reviewSchema]  , 'url' : {
																				'type' : String ,
																														'slug' : 'title' ,
																																								'unique' : true ,
																																																	'slugPaddingSize' : 3		} } ,

	{	'toObject' : {	
										'virtuals' : true } ,	
																						'toJSON' : {	
																													'virtuals' : true } ,	
																																								'getters' : true 	});


reviewSchema
						.virtual('r_timestamp')
																		.get(function () {
  																											return this.timestamp ? moment(this.timestamp).format('DD-MM-YYYY') : '';
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

titleSchema.plugin(require('mongoose-autopopulate'));

mongoose.plugin(slug , options);

module.exports = mongoose.model('Title' , titleSchema);

