var express = require('express'),			router = express.Router(),		country = require('../controllers/country');



router.get('/country'											,		country.countryList);

router.get('/country/name/:country'				,		country.countryName);

router.post('/country'										,		country.countryAdd);	



router.get('/country/:country'						,		country.countryDetail);

router.put('/country/:country'						,		country.countryUpdate);

router.delete('/country/:country'					,		country.countryDelete);




module.exports = router;