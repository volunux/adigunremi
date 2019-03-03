var express = require('express'),			router = express.Router(),		actor = require('../controllers/actor') , jwt = require('express-jwt');

auth = jwt({
							'secret': process.env.JWT_SECRET ,
																									'userProperty': 'payload'
});




router.get('/actor'											,		actor.actorList);

router.get('/actor/m'										,		actor.actorListM);

router.get('/actor/f'										,		actor.actorListF);

router.get('/actor/name/:actor'					,		actor.actorName);

router.get('/actor/:actor'							,		actor.actorDetail);
	
router.get('/actor/:actor/titles'				,		actor.actorTitle);



router.post('/actor'										,		actor.actorAdd);

router.put('/actor/:actor'							,		actor.actorUpdate);
	
router.delete('/actor/:actor'						,		actor.actorDelete);



module.exports = router;