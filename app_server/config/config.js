var mongoose = require('mongoose');

module.exports = {

	'url' : 'mongodb://localhost/aremi',

	'gracefulShutdown' : function(msg , callback) {
																										mongoose.connection.close(function() {
																																														console.log('Mongoose disconnected through ' + msg);
																																																																									callback();
																										});
				},

	'response' : function(res , status , body) {
																								res.status(status);
																																		res.json({'status' : body});
	},

	'sessionSecret' : 'aSecret',

	'id' : mongoose.Types.ObjectId

}