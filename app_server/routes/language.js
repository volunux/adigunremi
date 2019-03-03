var express = require('express'),				router = express.Router(),		language = require('../controllers/language');



router.get('/language'												,		language.languageList);

router.get('/language/add'										,		language.languageAdd);


router.get('/language/:language'							,		language.languageDetail);
	
router.post('/language/add'										,			language.languageAddP);



router.get('/language/:language/update'				,		language.languageUpdate);

router.post('/language/:language/update'			,		language.languageUpdateP);



router.get('/language/:language/delete'				,		language.languageDelete);

router.post('/language/:language/delete'			,		language.languageDeleteP);




module.exports = router;