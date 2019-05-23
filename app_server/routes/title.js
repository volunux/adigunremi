var express = require('express') ,	router = express.Router() ,		title = require('../controllers/title') , user = require('../controllers/users');
		
router.get('/'																																											,												title.titleList);

router.get('/add'															,								user.ensureAuthenticated 						,												title.titleAdd);

router.get('/:title'													,																																						title.titleDetail);	

router.post('/add'														,								user.ensureAuthenticated 						,												title.titleAddP);

router.get('/:title/trailer'																																			,												title.titleTrailer);

router.get('/:title/photos'																																				,												title.titlePhoto);

router.get('/title/name/credits'																																				,												title.titleCredits);

router.get('/:title/cast'																																					,												title.titleCast);
	
router.get('/:title/reviews'																																			,												title.titleReviews);


router.get('/:title/reviews/add'							,								user.ensureAuthenticated 						,												title.titleAddReview);
	
router.post('/:title/reviews/add'							,								user.ensureAuthenticated 						,												title.titleAddReviewP);


router.get('/:title/update'										,								user.ensureAuthenticated 							,												title.titleUpdate);
	
router.post('/:title/update'									,								user.ensureAuthenticated 							,												title.titleUpdateP);


router.get('/actor/add/'											,								user.ensureAuthenticated 						,												title.titleAddActor);
	
router.post('/actor/add/'											,								user.ensureAuthenticated 						,												title.titleAddActorP);

router.get('/trailer/add/'										,								user.ensureAuthenticated 						,												title.titleAddTrailer);
	
router.post('/trailer/add/'										,								user.ensureAuthenticated 						,												title.titleAddTrailerP);

router.get('/:title/actor/update/'						,								user.ensureAuthenticated 						,												title.titleUpdateActor);
	
router.post('/:title/actor/update/'						,								user.ensureAuthenticated 						,												title.titleUpdateActorP);


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
	
router.get('/:title/delete'											,				title.titleDelete);
	
router.post('/:title/delete'										,				title.titleDeleteP);

	


module.exports = router;