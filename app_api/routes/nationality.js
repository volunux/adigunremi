var express = require('express'),			router = express.Router(),		nationality = require('../controllers/nationality');


router.get('/nationality/'														,		nationality.nationalityList);

router.get('/nationality/:nationality'								,		nationality.nationalityDetail);

router.post('/nationality/'														,		nationality.nationalityAdd);



module.exports = router;