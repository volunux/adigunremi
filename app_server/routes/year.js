var express = require('express'),	router = express.Router(),		year = require('../controllers/year') ,  user = require('../controllers/users');



router.get('/'											,		year.yearList);

router.get('/add'										,		year.yearAdd);

router.post('/add'									,								user.ensureAuthenticated 						,									year.yearAddP);


router.get('/:year'									,		year.yearDetail);
	

/*

router.get('/year/:year/update'					,		year.yearUpdate);

router.post('/year/:year/update'				,		year.yearUpdateP);



router.get('/year/:year/delete'					,	year.yearDelete);

router.post('/year/:year/delete'				,		year.yearDeleteP);

*/



module.exports = router;