var express = require('express') ,	router = express.Router() ,		title = require('../controllers/title') , user = require('../controllers/users');

router.get('/'																																													,												title.title);
		
router.get('/title'																																											,												title.titleList);

router.get('/title/add'															,								user.ensureAuthenticated 						,												title.titleAdd);

router.get('/title/:title'													,																																						title.titleDetail);	

router.post('/title/add'														,								user.ensureAuthenticated 						,												title.titleAddP);

router.get('/title/:title/trailer'																																			,												title.titleTrailer);

router.get('/title/:title/photos'																																				,												title.titlePhoto);

router.get('/title/name/credits'																																				,												title.titleCredits);

router.get('/title/:title/cast'																																					,												title.titleCast);
	
router.get('/title/:title/reviews'																																			,												title.titleReviews);


router.get('/title/:title/reviews/add'							,								user.ensureAuthenticated 						,												title.titleAddReview);
	
router.post('/title/:title/reviews/add'							,								user.ensureAuthenticated 						,												title.titleAddReviewP);


router.get('/title/:title/update'										,								user.ensureAuthenticated 							,												title.titleUpdate);
	
router.post('/title/:title/update'									,								user.ensureAuthenticated 							,												title.titleUpdateP);


router.get('/title/actor/add/'											,								user.ensureAuthenticated 						,												title.titleAddActor);
	
router.post('/title/actor/add/'											,								user.ensureAuthenticated 						,												title.titleAddActorP);

router.get('/title/trailer/add/'										,								user.ensureAuthenticated 						,												title.titleAddTrailer);
	
router.post('/title/trailer/add/'										,								user.ensureAuthenticated 						,												title.titleAddTrailerP);

router.get('/title/:title/actor/update/'						,								user.ensureAuthenticated 						,												title.titleUpdateActor);
	
router.post('/title/:title/actor/update/'						,								user.ensureAuthenticated 						,												title.titleUpdateActorP);


/*
		
router.get('/title/name/actor/update'								,				title.titleUpdateActor);

router.post('/title/name/actor/update'							,				title.titleUpdateActorP)
		
router.get('/title/name/actor/name/delete'					,				title.titleDeleteActor);

router.post('/title/name/actor/name/delete'					,				title.titleDeleteActorP);



router.get('/title/name/genre/add'									,				title.titleAddGenre);
	
router.post('/title/name/genre/add'									,				title.titleAddGenreP);

router.get('/title/name/genre/update'								,				title.titleUpdateGenre);

router.post('/title/name/genre/update'							,				title.titleUpdateGenreP);

router.get('/title/name/genre/name/delete'					,				title.titleDeleteGenre);

router.post('/title/name/genre/name/delete'					,				title.titleDeleteGenreP);

*/
	
router.get('/title/:title/delete'											,				title.titleDelete);
	
router.post('/title/:title/delete'										,				title.titleDeleteP);

	


module.exports = router;