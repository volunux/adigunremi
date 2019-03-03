var express = require('express'),	router = express.Router(),		title = require('../controllers/title');

router.get('/'							,				title.title);

module.exports = router;