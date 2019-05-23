var express = require('express'),	router = express.Router(),		studio = require('../controllers/studio') ,  user = require('../controllers/users');



router.get('/'									,		studio.studioList);

router.get('/add'								,		studio.studioAdd);

router.get('/:studio'						,		studio.studioDetail);

router.get('/:studio/titles'			,		studio.studioTitle);



		
router.post('/add'								,								user.ensureAuthenticated 						,									studio.studioAddP);



router.get('/:studio/update'			,								user.ensureAuthenticated 						,									studio.studioUpdate);

router.post('/:studio/update'		,								user.ensureAuthenticated 						,									studio.studioUpdateP);



router.get('/:studio/delete'			,								user.ensureAuthenticated 						,									studio.studioDelete);

router.post('/:studio/delete'		,								user.ensureAuthenticated 						,									studio.studioDeleteP);




module.exports = router;