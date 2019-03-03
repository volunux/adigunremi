var createError = require('http-errors') ,	express = require('express') ,	path = require('path') ,		cookieParser = require('cookie-parser') ,	logger = require('morgan') ,

session = require('express-session') ,	config = require('./app_server/config/config') , rConfig = require('./app_server/config/routes') , mOverride = require('method-override'),

passport = require('passport') , passportConf = require('./app_server/config/passport') , bodyParser = require('body-parser') , app = express();

require('./app_server/config/db');
 
app.set('views', path.join(__dirname, 'app_server' , 'views'));
																																app.set('view engine', 'pug');
																																																		app.use(session({
																																																											'saveUninitialized' : true,
																																																																									'resave' : true,
																																																																																   'secret' : config.sessionSecret
																																																										}));

app.use(passport.initialize());
																app.use(passport.session());
																															app.use(logger('dev'));
																																												app.use(express.json());
																																																									app.use(express.urlencoded({ extended: true}));
																																																																																		app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.authenticate('local', {
																	successRedirect: '/',
																													failureRedirect: '/signup',
																																												ailureFlash: true
																																																						})

app.use('/' , rConfig.indexRouter);
																		app.use('/' , rConfig.titleRouter);
																																				app.use('/' , rConfig.genreRouter);
																																																						app.use('/' , rConfig.studioRouter);
																																																																									app.use('/' , rConfig.actorRouter);
app.use('/', rConfig.usersRouter);
																				app.use('/' , rConfig.yearRouter);
																																						app.use('/' , rConfig.countryRouter);
																																																									app.use('/' , rConfig.languageRouter);
app.use('/api' , rConfig.apiTitleRouter);
																					app.use('/api' , rConfig.apiGenreRouter);
																																										app.use('/api' , rConfig.apiStudioRouter);
																																																																app.use('/api' , rConfig.apiActorRouter);
app.use('/api' , rConfig.apiYearRouter);
																					app.use('/api' , rConfig.apiCountryRouter);
																																												app.use('/api' , rConfig.apiLanguageRouter);

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