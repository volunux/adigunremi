const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Genre = require('../../app_api/models/genre'), Country = require('../../app_api/models/country'), Year = require('../../app_api/models/year'), Studio = require('../../app_api/models/studio'),

Language = require('../../app_api/models/language') ,	Title = require('../../app_api/models/title') , Actor = require('../../app_api/models/actor') ,	fs = require('fs') , addTitle = {},

multer = require('multer') , path = require('path') , tSet = require('../config/title') ,	upload = multer({ storage: tSet.multer }) ,  async = require('async') ,	axios = require('axios') , 

data = '' , url = '' , titleDetail = '' , tParam = '' , status = '' , title = '';

module.exports = {

	'add' : (req , res) => {
																									res.render('add' , {'title' : 'Add' });				}

}
