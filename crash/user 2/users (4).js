var express = require('express') , router = express.Router() , User = require('../../app_api/models/users') , passport = require('passport') , user = require('../controllers/users');

router.get('/signup'  , user.signup);

router.get('/profile' , user.userProfile);

router.get('/login' , user.login);

router.get('/logout' , user.logout);

router.post('/signup' , user.signupP);

router.post('/login' ,	passport.authenticate('local', { 
																													'successRedirect' : '/' ,
                                   																							 'failureRedirect' : '/login',
                                   																																							'failureFlash' : true }));

router.get('/user', function(req, res){
  res.send(req.user);
})


// Endpoint to logout
router.get('/logout', function(req, res){
  req.logout();
  res.send(null)
});


module.exports = router;