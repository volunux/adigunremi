var express = require('express'),	router = express.Router(),		genre = require('../controllers/genre') ,  user = require('../controllers/users');



router.get('/genre'																																						,									genre.genreList);

router.get('/genre/add'																																				,									genre.genreAdd);

router.post('/genre/add'									,								user.ensureAuthenticated 						,									genre.genreAddP);


router.get('/genre/:genre'																																		,									genre.genreDetail);
	



router.get('/genre/:genre/update'					,								user.ensureAuthenticated 						,									genre.genreUpdate);

router.post('/genre/:genre/update'				,								user.ensureAuthenticated 						,									genre.genreUpdateP);



router.get('/genre/:genre/delete'					,								user.ensureAuthenticated 						,									genre.genreDelete);

router.post('/genre/:genre/delete'				,								user.ensureAuthenticated 						,									genre.genreDeleteP);




module.exports = router;