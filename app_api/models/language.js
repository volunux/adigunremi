var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var languageSchema = new Schema({
																	'language' : {
																								'type' : String ,
																																		'minlength' : 1 ,
																																												'required' : true ,
																																																							'maxlength' : 30
																	}
});

module.exports = mongoose.model('Language' , languageSchema);