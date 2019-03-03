var express = require('express'),			router = express.Router(),		language = require('../controllers/language');



router.get('/language'										,		language.languageList);

router.get('/language/name/:language'			,		language.languageName);

router.post('/language'										,		language.languageAdd);	




router.get('/language/:language'						,		language.languageDetail);

router.put('/language/:language'						,		language.languageUpdate);

router.delete('/language/:language'					,		language.languageDelete);




module.exports = router;