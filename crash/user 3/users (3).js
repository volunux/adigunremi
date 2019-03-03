var express = require('express') , router = express.Router() , User = require('../../app_api/models/user') , passport = require('passport') , user = require('../controllers/users');

router.route('/users').post(user.create);

router.route('/users/:userId')
																.get(user.read)
																								.put(user.update)
																																	.delete(user.delete);
router.route('/signup')
												.get(user.renderSignUp)
																								.post(user.signUp);

router.route('/signin')
												.get(user.renderSignin)
																								.post(passport.authenticate('local' , {'session' : false} , {
																																													'successRedirect' : '/' ,
																																																											'failureRedirect' : '/signin' ,																																																																												
																								}));

router.route('/signout')
													.get(user.signout);

router.param('userId' , user.userById);

module.exports = router;