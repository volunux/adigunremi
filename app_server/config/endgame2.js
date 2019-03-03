module.exports = {

'uploadImages' : (fs , req , path , fields , files) => {
																									var arr = new Array(files)[0];
																																									for (var file in arr) {
																																																							var tempPath = path.resolve(arr[file]['path']),
																									 ext = path.extname(arr[file]['name']).toLowerCase(),
																									 																												tPath = fields.title.toLowerCase().split(' ').join('_'),
		targetPath = './public/titles/' + tPath + '/' + tPath + Date.now() + ext;																
																																																		if (ext) {
																																																								fs.rename(tempPath , targetPath , function(err) {					
																																							console.log('finally');
																																																									})
																																																					}
																														}

},
 
'checkTitlePath' : (fs , req , path , fields , files) => {
																														var titlePath = './public/titles/' + fields.title.toLowerCase().split(' ').join('_');
																																																																									if (fs.exists(titlePath)) {
																		module.exports.uploadImages(fs , req , path , fields , files);
																																																			console.log('No');
																																															}
																																																									else {
																			fs.mkdir(titlePath , function(err) {
																																							console.log('Yes it works.');
																																																								module.exports.uploadImages(fs , req , path , fields , files)
																																				})
																		}
}

}

