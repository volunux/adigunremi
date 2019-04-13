var express = require('express'),			router = express.Router(),		actor = require('../controllers/actor');



router.get('/actor'																	,				actor.actorList);

router.get('/actor/add'															, 			actor.actorAddPage);

router.get('/actor/gender/:gender'									,				actor.actorListGender);

router.get('/actor/name/:actor'											,				actor.actorName);

router.get('/actor/:actor'													,				actor.actorDetail);
	
router.get('/actor/:actor/titles'										,				actor.actorTitle);

router.get('/actor/:actor/update'										,				actor.actorUpdatePage);




router.post('/actor'																,				actor.actorAdd);
	
router.put('/actor/:actor'													,				actor.actorUpdate);
		
router.delete('/actor/:actor'												,				actor.actorDelete);



module.exports = router;
