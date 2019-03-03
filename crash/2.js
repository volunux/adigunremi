[

				body('name'											,		'Name must not be empty.')											.isLength({ min: 3 }).trim(),
				body('nickname'									, 	'Nickname time must be provided.')							.isLength({ min: 1 }).trim(),
				body('occupation'								, 	'Occupation must be provided.')									.isLength({ min: 1 }).trim(),
				body('date_of_birth'						, 	'Date of Birth must be provided.')							.isLength({ min: 1 }).trim(),
				body('gender'										, 	'Gender must not be empty.')										.isLength({ min: 1 }).trim(),
				body('nationality'							, 	'Nationality must be provided.')								.isLength({ min: 1 }).trim(),
				body('place_of_birth'						, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('country_of_origin'				, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('state_of_origin'					, 	'Place of Birth must not be empty.')						.isLength({ min: 1 }).trim(),	
				body('networth'									, 	'Must not be empty.')														.isLength({ min: 1 }).trim(),
				body('partner_or_spouse'				, 	'This field must be provided.')									.isLength({ min: 1 }).trim(),
				body('biography'								, 	'Biography must be provided.')									.isLength({ min: 1 }).trim(),

				sanitizeBody('*').trim().escape(),
				
				(req , res , next) => {

				var addActor = {} , uFile = req.files , file = {};
				
				if (uFile) {

				for (var i in uFile) {																																														
																file.name = uFile.originalname;
																																file.path = uFile.path;
																																												file.type = uFile.mimetype;
																																																										file.encoding = uFile.encoding;		}	

																																																		aSet.createActor(req.body , uFile , addActor , file);
																										}
																																																																													var actor = addActor;

																																																																													console.log(actor);
				const errors = validationResult(req);

				console.log(req.body);

						console.log(errors.isEmpty());

						console.log(errors.array());

								if (!errors.isEmpty()) {																												
																					res.render('form/actor-add' , {'title' : 'Add Title',	'actor' : actor , 'errors' : errors.array()			});
        																																																																								}
        							else {
															aSet.reqOptions = {		'url' : 'http://localhost:3000/api/actor' ,
																																																'method' : 'POST' ,
																																																										'json' : actor,
																																																																			'qs' : {}			}
																				request(aSet.reqOptions, (err , resBody , body) => {

													})
        														}																																																	
	}]