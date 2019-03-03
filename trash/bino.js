			var form = new formidable.IncomingForm();
																								form.parse(req , function(err , fields , files) { 
																																																		var photos = [], pFolder , pTitle , photoName;

																																																		console.log(fields);

																																																		if (!fields.genre instanceof Array) {
																																																																						console.log(new Array(fields.genre));
																																																		}

					function verify() {
																for (var i = 0 ; i < files.length; i++) {
																																						for (var j in files) {
																																																		if (files[j]) {
																																																											photos[i] = files[j][path]
																																																																									console.log(photos) 
																																																		}
																																						}
																}
					} 
																																		verify();
																				/**					function() {


																									}
																																																																
																					
		var photoOne = files.photo2.path
																			pFolder = pTitle = fields.title.toLowerCase().split(' ').join('-'),
																												
																																										photoname = String(fields.title + Date.now() + ' photo2').toLowerCase().split(' ').join('-');
			fs.exists(pFolder , function(exist) {
																							if (exist) {

																																cDir.createDir(res , photoOne , pFolder , photoname);		
																								
																							}
																	else {
																							fs.mkdir('./public/images/' + pFolder , function(err) {
																																																					if (err) {
																																																												console.log('Eror has occured');
																																																																													return;
																																																																												}
																																																		 						})
																							cDir.createDir(res , photoOne , pFolder , photoname);		
																	}
																														}) **/