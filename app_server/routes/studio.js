var express = require('express'),	router = express.Router(),		studio = require('../controllers/studio') ,  user = require('../controllers/users');



router.get('/studio'										,		studio.studioList);

router.get('/studio/add'								,		studio.studioAdd);

router.get('/studio/:studio'						,		studio.studioDetail);

router.get('/studio/:studio/titles'			,		studio.studioTitle);



		
router.post('/studio/add'								,								user.ensureAuthenticated 						,									studio.studioAddP);



router.get('/studio/:studio/update'			,								user.ensureAuthenticated 						,									studio.studioUpdate);

router.post('/studio/:studio/update'		,								user.ensureAuthenticated 						,									studio.studioUpdateP);



router.get('/studio/:studio/delete'			,								user.ensureAuthenticated 						,									studio.studioDelete);

router.post('/studio/:studio/delete'		,								user.ensureAuthenticated 						,									studio.studioDeleteP);




module.exports = router;