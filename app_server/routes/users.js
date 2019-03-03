var express = require('express') , router = express.Router() , User = require('../../app_api/models/user') , passport = require('passport') , user = require('../controllers/users');

//router.route('/users').post(user.create);

router.get('/profile' 								,			user.ensureAuthenticated ,				user.profile)

router.get('/signup'									,							user.renderSignUp);

router.post('/signup' 								,							user.signUp);



router.get('/login'										,							user.renderSignIn);

router.post('/login'									,							user.signin);



router.route('/signout')
													.get(user.signout);

router.get('/forgot'									,							user.forgot);

router.post('/forgot'									,							user.forgotP);

router.get('/reset/:token'						,							user.reset);

router.post('/reset/:token'						,							user.resetP);

router.param('userId'									, 						user.userById);

module.exports = router;