var users = require('./users') , title = require('./title') , genre = require('./genre') , studio = require('./studio') , actor = require('./actor') , year = require('./year') ,

country = require('./country') , language = require('./language') , nationality = require('./nationality');

module.exports = (app) => {

	app.use('/api'								,												title);
	app.use('/api'								,												users);
	app.use('/api'								,												title);
	app.use('/api'								,												genre);
	app.use('/api'								,												studio);
	app.use('/api'								,												actor);
	app.use('/api'								,												year);
	app.use('/api'								,												country);
	app.use('/api'								,												nationality);
	app.use('/api'								,												language);	

}