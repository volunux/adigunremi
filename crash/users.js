var express = require('express') , router = express.Router() , User = require('../../app_api/models/users') , passport = require('passport') , user = require('../controllers/users')


router.use((req, res, next) => {		res.locals.currentUser = req.user;
																																						next();
});

router.get('/users' , user.getUsers);

router.get("/users/:username", user.userProfile);


router.get('/signup' , user.signup);

router.post('/signup', user.signupP);

router.get('/login' , user.login);

router.post("/login", passport.authenticate("login", {
																												successRedirect: "/",
																																							failureRedirect: "/signup",
																																																					failureFlash: true
																						}));
router.get('/logout' , (req , res) => {
																					req.logout();
																													res.redirect('/');
});

router.use(function(req, res, next) {
																				res.locals.currentUser = req.user;
																																						next();
});



router.get("/edit", user.ensureAuthenticated, function(req, res) {
																																		res.render("form/edit");
});


module.exports = router;