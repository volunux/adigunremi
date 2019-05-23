var express = require('express'),	router = express.Router(),		genre = require('../controllers/genre') ,  user = require('../controllers/users');



router.get('/'																																						,									genre.genreList);

router.get('/add'																																				,									genre.genreAdd);

router.post('/add'									,								user.ensureAuthenticated 						,									genre.genreAddP);


router.get('/:genre'																																		,									genre.genreDetail);
	



router.get('/:genre/update'					,								user.ensureAuthenticated 						,									genre.genreUpdate);

router.post('/:genre/update'				,								user.ensureAuthenticated 						,									genre.genreUpdateP);



router.get('/:genre/delete'					,								user.ensureAuthenticated 						,									genre.genreDelete);

router.post('/:genre/delete'				,								user.ensureAuthenticated 						,									genre.genreDeleteP);




module.exports = router;