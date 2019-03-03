console.log(req.body);
																													var folder = './public/title/' + req.body.title.toLowerCase().split(' ').join('_'),

																														arr = [req.files.photo , req.files.photo1, req.files.photo2, req.files.photo3, req.files.trailer];
																									
																									if (fs.existsSync(folder)) {
																																								compileFiles();
																								} else {
																													console.log('good');
																																										fs.mkdir(folder , function(err) {
																																																												compileFiles();
																																										})
																								}

																								var i = 1;
																																	var name = String(folder + '/' + req.body.title.toLowerCase().split(' ').join('_') + Date.now() + 'photo');

								function compileFiles() {
																							arr.forEach(function(file) {
																																							console.log(file.mv('./public/title/gate', function() {
																																																													console.log(10);
																																							}));
																				})
												}								