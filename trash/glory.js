				console.log(req.body);
																																					console.log(req.files);
																					var tway = './public/title/' + req.body.title;


																					console.log(tway);
																																													fs.mkdir(tway , function(err) {

																																																							req.files.photo.mv(tway + req.files,
											function(err) {
																					console.log('Yes');
											})
																																				
																																			})