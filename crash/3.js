				(req , res , next) => {

				var addActor = {} , uFile = req.files[0] , file = {} , actor; 
																																		aSet.fileLoop(file , uFile);				
																																																	aSet.createActor(req.body , uFile , addActor , file);
																																																																									 			actor = new Actor(addActor);
																																																												console.log(actor);

																																																												console.log(req.body);

																																																												console.log(req.files);
				const errors = validationResult(req);

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