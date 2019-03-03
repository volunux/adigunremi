var express = require('express'),	router = express.Router(),		studio = require('../controllers/studio');


router.get('/studio'													,		studio.studioList);

router.post('/studio'													,		studio.studioAdd);


router.get('/studio/name/:studio'							,		studio.studioName);

router.get('/studio/:studio'									,		studio.studioDetail);
	
router.put('/studio/:studio'									,		studio.studioUpdate);

router.delete('/studio/:studio'								,		studio.studioDelete);

router.get('/studio/:studio/titles'						,		studio.studioTitle);






module.exports = router;