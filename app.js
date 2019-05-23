require('dotenv').load();

var createError = require('http-errors') ,	express = require('express') ,	path = require('path') ,		cookieParser = require('cookie-parser') ,	logger = require('morgan') , flash = require('express-flash') ,

session = require('express-session') , passport = require('passport'), bodyParser = require('body-parser'), favicon = require('serve-favicon') , compression = require('compression'), helmet = require('helmet') ,

cors = require('cors') , app = express();

const isProd = process.env.NODE_ENV === 'production';

var routes = require('./app_server/routes/route') , apiRoutes = require('./app_api/routes/routes') , config = require('./app_server/config/config') , pConfig = require('./app_server/config/passport');

require('./app_server/config/db');

require('./app_server/config/users');

app.set('views', path.join(__dirname, 'app_server' , 'views'));
																																app.set('view engine', 'pug');
																																																app.use(session({	'saveUninitialized' : true,
																																																																							'resave' : true,
																																																																															   'secret' : config.sessionSecret	}));
app.use(flash());
									app.use(cors());
																		app.use(favicon(path.join(__dirname , 'public' , 'favicon' , 'favicon.ico')));
																																																										app.use(passport.initialize());
																																																																											app.use(passport.session());
require('./app_server/config/passport')();																															
																						app.use(logger('dev'));
																																		app.use(express.json());
																																															app.use(express.urlencoded({ extended: true}));
																																																																							app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
																													app.use((req , res , next) => {	if (req.user) {	res.locals.user = req.user;	}
res.locals.moment = require('moment-timezone');
																																																																				next();		});
if (isProd) {
								app.use(compression());
																				app.use(helmet());	}
																																routes(app);
																																							apiRoutes(app);
app.use(function(req, res, next) {
																		next(createError(404));
});


app.use(function(err, req, res, next) {

	console.log(err);
  																			res.locals.message = err.message;
  																																				res.locals.error = req.app.get('env') === 'development' ? err : {};
  																																																																						res.status(err.status || 500);
									  res.render('error');
});

module.exports = app;