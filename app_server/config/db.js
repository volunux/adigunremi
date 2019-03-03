var mongoose = require('mongoose'),			config = require('./config');

mongoose.promise = global.promise;

mongoose.connect('mongodb://yusuf:08099757823@mongodb-908-0.cloudclusters.net/Aremi?authSource=admin' , { 'useNewUrlParser' : true });

mongoose.connection.on('connected' , function() {
																														console.log('App establish connection to the database');
});

mongoose.connection.on('error' , function() {
																														console.log('App encounter error connecting to database');
});

mongoose.connection.on('disconnected' , function() {
																														console.log('App successfully disconnected from database');
});

process.once('SIGUSR2' , function() {
																					config.gracefulShutdown('nodemon restart' , function() {
																																																		process.kill(process.pid , 'process kill');
																					});
});

process.on('SIGINT' , function() {
																					config.gracefulShutdown('node restarts' , function() {
																																																		process.exit(0);
																					});
});

process.on('SIGTERM' , function() {
																					config.gracefulShutdown('heroku node restarts' , function() {
																																																					process.exit(0);
																					});
});