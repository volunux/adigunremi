var express = require('express'),	router = express.Router(),		actor = require('../controllers/actor') ,  user = require('../controllers/users');

router.get('/'																																						,									actor.actorList);

router.get('/gender/:gender'																															,									actor.actorListGender);

router.get('/add'										,								user.ensureAuthenticated 						,									actor.actorAdd);

router.get('/:actor'																																		,									actor.actorDetail);
	
router.get('/:actor/titles'																															,									actor.actorTitle);




router.post('/add'									,								user.ensureAuthenticated 						,									actor.actorAddP);



router.get('/:actor/update'					,									user.ensureAuthenticated 						,								actor.actorUpdate);

router.post('/:actor/update'				,									user.ensureAuthenticated 						,								actor.actorUpdateP);



router.get('/:actor/delete'					,									user.ensureAuthenticated 						,								actor.actorDelete);

router.post('/:actor/delete'				,									user.ensureAuthenticated 						,								actor.actorDeleteP);



module.exports = router;