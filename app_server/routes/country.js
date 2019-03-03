var express = require('express'),				router = express.Router(),		country = require('../controllers/country') ,  user = require('../controllers/users');



router.get('/country'															,		country.countryList);
	
router.get('/country/add'													,		country.countryAdd);
		
router.post('/country/add'												,								user.ensureAuthenticated 						,									country.countryAddP);


router.get('/country/:country'										,		country.countryDetail);




router.get('/country/:country/update'							,		country.countryUpdate);
	
router.post('/country/:country/update'						,								user.ensureAuthenticated 						,									country.countryUpdateP);



router.get('/country/:country/delete'							,		country.countryDelete);

router.post('/country/:country/delete'						,								user.ensureAuthenticated 						,									country.countryDeleteP);



module.exports = router;