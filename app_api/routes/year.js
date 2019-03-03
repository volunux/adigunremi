var express = require('express'),			router = express.Router(),		year = require('../controllers/year');


router.get('/year/'														,		year.yearList);

router.get('/year/:year'											,		year.yearDetail);

router.post('/year/'													,		year.yearAdd);



module.exports = router;