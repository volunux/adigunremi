var mongoose = require('mongoose') , Schema = mongoose.Schema;

var miscSchema = new Schema({
																'name' : {
																						'type' : String,
																																'lowercase' : true
																																										},
																									'age' : Number
});

module.exports = mongoose.model('Misc' , miscSchema);

