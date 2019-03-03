var express = require('express'),			router = express.Router(),		title = require('../controllers/title')

router.get('/'																			,				title.title);
		
router.get('/title'																	,				title.titleList);

router.get('/title/name/:title'											,				title.titleName);

router.post('/title'																,				title.titleAdd);

router.get('/title/add'															, 			title.titleAddPage);



router.get('/title/:title'													,				title.titleDetail);	

router.put('/title/:title'													,				title.titleUpdateP);

router.delete('/title/:title'												,				title.titleDelete);
	



router.get('/title/:title/trailers'									,				title.titleTrailer);

router.get('/title/:title/photos'										,				title.titlePhoto);

router.get('/title/:title/credits'									,				title.titleCredits);

router.get('/title/:title/cast'											,				title.titleCast);



	
router.get('/title/:title/reviews'									,				title.titleReviews);

router.post('/title/:title/reviews'									,				title.titleAddReview);


router.get('/title/:title/update'										,				title.titleUpdate);

router.post('/title/:title/reviews'									,				title.titleAddReview);	


router.post('/title/:title/actor'										,				title.titleAddActor);
		
router.put('/title/:title/actor/:name'							,				title.titleUpdateActor)
		
router.delete('/title/:title/actor/:name/'					,				title.titleDeleteActor);


	
router.post('/title/:title/genre/'									,				title.titleAddGenre);

router.put('/title/:title/genre/:name'							,				title.titleUpdateGenre);

router.delete('/title/:title/genre/:name'						,				title.titleDeleteGenre);


	
	
	


module.exports = router;