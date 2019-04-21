module.exports = {

		'indexRouter' : require('../routes/index'),
		
		'usersRouter' : require('../routes/users'),
		
		'titleRouter' : require('../routes/title'),

		'trailerRouter' : require('../routes/trailer'),
		
		'genreRouter' : require('../routes/genre'),

		'studioRouter' : require('../routes/studio'),

		'actorRouter' : require('../routes/actor'),

		'yearRouter' : require('../routes/year'),
		
		'countryRouter' : require('../routes/country'),
		
		'languageRouter' : require('../routes/language'),
	
		'apiTitleRouter' : require('../../app_api/routes/title'),
	
		'apiGenreRouter' : require('../../app_api/routes/genre'),
		
		'apiStudioRouter' : require('../../app_api/routes/studio'),
	
		'apiActorRouter' : require('../../app_api/routes/actor'),

		'apiYearRouter' : require('../../app_api/routes/year'),
	
		'apiCountryRouter' : require('../../app_api/routes/country'),

		'apiLanguageRouter' : require('../../app_api/routes/language'),

		'apiYearRouter' : require('../../app_api/routes/year'),

		'apiNationalityRouter' : require('../../app_api/routes/nationality'),

		'apiUserRouter' : require('../../app_api/routes/users')
}