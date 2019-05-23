var index = require('./index') , users = require('./users') , title = require('./title') , trailer = require('./trailer') , genre = require('./genre') , studio = require('./studio') , actor = require('./actor') ,

year = require('./year') , country = require('./country') , language = require('./language');


module.exports = (app) => {


	app.use('/'											,												index);
	app.use('/'											,												users);
	app.use('/title'								,												title);
	app.use('/trailer'							,												trailer);
	app.use('/genre'								,												genre);
	app.use('/studio'								,												studio);
	app.use('/actor'								,												actor);
	app.use('/year'									,												year);
	app.use('/country'							,												country);
	app.use('/language'							,												language);	

}