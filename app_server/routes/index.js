var express = require('express'),	router = express.Router(),		title = require('../controllers/title') , actor = require('../controllers/actor') , index = require('../controllers/index');

router.get('/'							,			title.title);

router.get('/add' 					,			index.add)

module.exports = router;