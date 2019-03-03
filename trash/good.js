var hamr = req.body.title.toLowerCase().split(' ').join('_');
																						var fkk = './public/title/' + hamr;
																																																																fs.mkdir(fkk ,
																																																																
																																																											function() { 	var goal = String(file.path);
					fs.rename(goal, fkk + '/' + hamr + file.fieldname + '_' + Date.now() , function() {
														console.log('yes');
					})
																																																											})