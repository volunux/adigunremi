var express = require('express'),			router = express.Router(),		misc = require('../controllers/misc');



router.get('/misc'									,		misc.miscList);

router.post('/misc'									,		misc.miscAdd);	




router.get('/misc/:title'						,		misc.miscDetail);





module.exports = router;