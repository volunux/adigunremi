var express = require('express') , router = express.Router() , User = require('../../app_api/models/users') , passport = require('passport') , user = require('../controllers/users')

router.get('/signup'  , user.signup);

router.get('/profile' , user.userProfile);

router.get('/login' , user.login);

router.get('/logout' , user.logout);

router.post('/signup', passport.authenticate('local-signup', {  
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {  
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));


module.exports = router;