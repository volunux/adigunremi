var express = require('express'),	router = express.Router(),		actor = require('../controllers/actor') ,  user = require('../controllers/users');




router.get('/actor'																																						,									actor.actorList);

router.get('/actor/gender/:gender'																															,									actor.actorListGender);

router.get('/actor/add'										,								user.ensureAuthenticated 						,									actor.actorAdd);

router.get('/actor/:actor'																																		,									actor.actorDetail);
	
router.get('/actor/:actor/titles'																															,									actor.actorTitle);




router.post('/actor/add'									,								user.ensureAuthenticated 						,									actor.actorAddP);



router.get('/actor/:actor/update'					,									user.ensureAuthenticated 						,								actor.actorUpdate);

router.post('/actor/:actor/update'				,									user.ensureAuthenticated 						,								actor.actorUpdateP);



router.get('/actor/:actor/delete'					,									user.ensureAuthenticated 						,								actor.actorDelete);

router.post('/actor/:actor/delete'				,									user.ensureAuthenticated 						,								actor.actorDeleteP);



module.exports = router;