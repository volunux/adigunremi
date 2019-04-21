var express = require('express') ,	router = express.Router() ,		title = require('../controllers/title') , user = require('../controllers/users');


router.get('/trailer/add/'										,								user.ensureAuthenticated 						,												title.titleAddTrailer);
	
router.post('/trailer/add/'										,								user.ensureAuthenticated 						,												title.titleAddTrailerP);

module.exports = router;