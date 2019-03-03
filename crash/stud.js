																	request(sSet.reqOptions , (err , resBody , body) => {																																													
																																													res.render('studio' , {'title' : 'Studios' , 'studios' : body.status});
																																						});