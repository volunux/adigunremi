module.exports = {

'uploadImages' : (fs , req , path , file) => {
																								
																																																									req.files.forEach(function(file) {
					var tempPath = path.resolve(file.path),
																									 ext = path.extname(file.originalname).toLowerCase(),
																									 																												tPath = req.body.title.toLowerCase().split(' ').join('_'),

		targetPath = './public/titles/' + tPath + '/' + req.body.title.toLowerCase().split(' ').join('_') + Date.now() + ext;
																																																														fs.rename(tempPath , targetPath , function(err) {
																																							console.log('finally');
													})
																																																									})
},
 
'checkTitlePath' : (fs , req , path , file) => {
																										var titlePath = './public/titles/' + req.body.title.toLowerCase().split(' ').join('_');
																																																																									if (fs.exists(titlePath)) {
																		module.exports.uploadImages(fs , req , path , file);
																																														console.log('No');
																																															}
																																																									else {
																			fs.mkdir(titlePath , function(err) {
																																							console.log('Yes it works.');
																																																								module.exports.uploadImages(fs , req , path , file)
																																				})
																		}
}

}