var mongoose = require('mongoose'),	Schema = mongoose.Schema;

var reviewSchema = new Schema({
			
'author' : {			'type' : String ,			'maxlength' : 30 ,	'required' : true } ,				'rating' : {	'type' : Number ,		'max' : 5 ,		'default' : 0	} ,
			
'review_text' : {	'type' : String ,			'maxlength' : 100	} ,														'timestamp' : {	'type' : Date ,		'default' : Date.now 	} });
	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/	

var trailerSchema = new Schema({
			
'name' : {				'type' : String ,			'maxlength' : 30 } ,															'path' : {			'type' : String ,			'default' : 'c:/'	} ,
			
'type' : {				'type' : String } ,																										'encoding' : {	'type' : String 	}																});
	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/
var photosSchema = new Schema({
			
'name' : {	'type' : String ,					'maxlength' : 30	} ,															'path' : {				'type' : String ,		'default' : 'c:/'		} ,
			
'type' : {	'type' : String 	} ,																												'encoding' : {		'type' : String }																							});
	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/
var photoSchema = new Schema({
			
'name' : {	'type' : String ,			} ,		'path' : String ,		'type' : String , 	'encoding' :  String		});
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

'production_countries' : [{	'type' : Schema.Types.ObjectId ,	'ref' : 'Country' , 'autopopulate' : true	}] ,	'budget' : String ,	'revenue' : String ,	'plot' : String ,
	/******************************************************************************************************************************************************************************************/
	/******************************************************************************************************************************************************************************************/
/**'cover_image' : [photoSchema] , 'photo' : [photosSchema] , 	'trailer' : [trailerSchema] , **/	'cast' : [{	'type' : Schema.Types.ObjectId ,	'ref' : 'Actor' ,  'autopopulate' : true }] ,

'reviews' : [reviewSchema] } ,	{	'toObject' : {	'virtuals' : true } ,	'toJSON' : {	'virtuals' : true } ,	'getters' : true 	});

titleSchema.plugin(require('mongoose-autopopulate'));

titleSchema
						.virtual('url')
														.get(function () {
  																							return String(this.title).toLowerCase().split(' ').join('-');
				});

reviewSchema
						.virtual('r_timestamp')
																		.get(function () {
  																											return this.timestamp ? moment(this.timestamp).format('DD-MM-YYYY') : '';
				});

module.exports = mongoose.model('Title' , titleSchema);

