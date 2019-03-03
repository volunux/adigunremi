var multer = require('multer') , fs = require('fs') , path = require('path');

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
},

'arrangeFiles' : (fs , req , path , pData , tData , cData) => {
																																				
							if (req.files.photo) {																																																							
																												for (var i = 0; i < req.files.photo.length; i++) {
																																																							req.files.photo.forEach(function(file) {
						pData[i] = {
													'name' : file.originalname,
																												'path' : file.path,
																																													'type' : file.mimetype,
																																																										'encoding' : file.encoding
																																																																								}
																																																																										})
																																																																													}; }
							if (req.files.trailer) {
																				for (var j = 0; j < req.files.trailer.length; j++) {
																																															req.files.trailer.forEach(function(file) {
							tData[j] = {
														'name' : file.originalname,
																												'path' : file.path,
																																													'type' : file.mimetype,
																																																										'encoding' : file.encoding
							}
																																																			})
																							} }

						if (req.files.cover_image) {
																				for (var k = 0; k < req.files.cover_image.length; k++) {
																																																	req.files.cover_image.forEach(function(file) {
							cData[k] = {
														'name' : file.originalname,
																												'path' : file.path,
																																													'type' : file.mimetype,
																																																										'encoding' : file.encoding
							}
																																																			})
																							} }
																									req.body.photo = pData , req.body.trailer = tData , req.body.cover_image = cData;
},

	'createTitle' : (title , addTitle) => {
																					addTitle.title = title.title;
																																				addTitle.rating = title.rating;
																																																					addTitle.spoken_languages = title.spoken_languages;
		addTitle.genre = title.genre;
																	addTitle.production_companies = title.production_companies;
																																															addTitle.production_countries = title.production_countries;
																																																																													addTitle.cast = title.cast;
		addTitle.released_date = title.released_date;
																									addTitle.running_time = title.running_time;
																																															addTitle.revenue = title.revenue;
																																																																addTitle.budget = title.budget;	
		addTitle.producer = title.producer;
																				addTitle.director = title.director;
																																						addTitle.photo = title.photo;
																																																					addTitle.plot = title.plot;
																																																																			addTitle.trailer = title.trailer;
		addTitle.cover_image = title.cover_image;
																									addTitle.reviews = title.reviews;
	},

	'multer' :  multer.diskStorage({
 																		'destination' : function (req, file, cb) {
																																							var titlePath = './public/titles/' + req.body.title.toLowerCase().split(' ').join('_');
				if (fs.existsSync(titlePath)) {
  																		cb(null, titlePath);
																														} else {
																																			fs.mkdir(titlePath , function(err) {
																																																						cb(null , titlePath);
																																																			})																																														
																																													}
																											  },
							'filename' : function (req, file, cb) {
																										var ext = path.extname(file.originalname),							
																																																fileName = req.body.title.toLowerCase().split(' ').join('_') + Date.now() + ext;
    																															cb(null, fileName)
  						}
																																																																				}),

	'uploadWare' : [{'name' : 'photo' , 'maxCount' : 5} , {'name' : 'trailer' , 'maxCount' : 3}, {'name' : 'cover_image' , 'maxCount' : 3}] ,

	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/title/' ,
																																'method' : 'GET' ,
																																										'json' : {},
																																																		'qs' : {}	
							}
}