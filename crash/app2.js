var createError = require('http-errors'),	express = require('express'),	path = require('path'),		cookieParser = require('cookie-parser'),	logger = require('morgan');

indexRouter = require('./app_server/routes/index'),
																										usersRouter = require('./app_server/routes/users'),
																																																				titleRouter = require('./app_server/routes/title'),
genreRouter = require('./app_server/routes/genre'),
																										studioRouter = require('./app_server/routes/studio'),
																																																					actorRouter = require('./app_server/routes/actor'),
yearRouter = require('./app_server/routes/year'),
																									countryRouter = require('./app_server/routes/country'),
																																																					languageRouter = require('./app_server/routes/language'),
apiTitleRouter = require('./app_api/routes/title'),
																										apiGenreRouter = require('./app_api/routes/genre'),
																																																				apiStudioRouter = require('./app_api/routes/studio'),
apiActorRouter = require('./app_api/routes/actor'),
																										apiYearRouter = require('./app_api/routes/year'),
																																																			apiCountryRouter = require('./app_api/routes/country'),
apiLanguageRouter = require('./app_api/routes/language');
																													session = require('express-session'),
																																																config = require('./app_server/config/config'),
																																																																								mOverride = require('method-override'),	
passport = require('passport'),
																app = express(),
																									passportConf = require('./app_server/config/passport');
																																																					require('./app_server/config/db');
app.set('views', path.join(__dirname, 'app_server' , 'views'));
																																app.set('view engine', 'pug');
																																																app.use(passport.initialize());
																																																																app.use(passport.session());
																																																																															app.use(logger('dev'));
app.use(express.json());
													app.use(express.urlencoded({ extended: false}));
																																					app.use(cookieParser());
																																																		app.use(session({
																																																											'saveUninitialized' : true,
																																																																									'resave' : false,
																																																																																   'secret' : config.sessionSecret
																																																										}));
app.use(express.static(path.join(__dirname, 'public')));
																													app.use('/title' , express.static(path.join(__dirname, 'public')));
																																																																app.use('/actors' , express.static(path.join(__dirname, 'actors')));
app.use('/studios' , express.static(path.join(__dirname, 'studios')));
																																				app.use('/title/actors' , express.static(path.join(__dirname, 'actors')));

app.use('/', indexRouter);
														app.use('/', titleRouter);
																												app.use('/', genreRouter);
																																										app.use('/', studioRouter);
																																																								app.use('/', actorRouter);
																																																																						app.use('/users', usersRouter);
app.use('/' , yearRouter);
														app.use('/' , countryRouter);
																													app.use('/' , languageRouter);
																												
app.use('/api', apiTitleRouter);
																	app.use('/api', apiGenreRouter);
																																		app.use('/api', apiStudioRouter);
																																																			app.use('/api', apiActorRouter);
																																																																				app.use('/api', apiYearRouter);
app.use('/api', apiCountryRouter);
																		app.use('/api' , apiLanguageRouter);

app.use(function(req, res, next) {
																		next(createError(404));
});


app.use(function(err, req, res, next) {
  																			res.locals.message = err.message;
  																																				res.locals.error = req.app.get('env') === 'development' ? err : {};
  																																																																						res.status(err.status || 500);
									  res.render('error');
});

module.exports = app;