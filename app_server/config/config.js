var mongoose = require('mongoose');

module.exports = {

	'url' : 'mongodb+srv://yusuf:12345@cluster0-fzsp2.mongodb.net/test?retryWrites=true',

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

	'id' : mongoose.Types.ObjectId ,

	'capitalize' : (string) => {
																return	string[0].toUpperCase() + string.slice(1).toLowerCase()
	}

}