var multer = require('multer') , fs = require('fs') , path = require('path');

module.exports = {

'uploadImage' : (fs , req , path , fields , file) => {
																																																						var tempPath = path.resolve(file.path),
																									 ext = path.extname(file.name).toLowerCase(),
																									 																												tPath = fields.studio.toLowerCase().split(' ').join('_'),
		targetPath = './public/studios/' + tPath + '/' + tPath + Date.now() + ext;																
																																																		if (ext) {
																																																								fs.rename(tempPath , targetPath , function(err) {					
																																							console.log('finally');
																																																									})
																																																					}
	

																	},
 
'checkActorPath' : (fs , req , path , fields , files) => {
																														var studioPath = './public/studios/' + fields.studio.toLowerCase().split(' ').join('_');
																																																																									if (fs.exists(studioPath)) {
																		module.exports.uploadImage(fs , req , path , fields , files);
																																																			console.log('No');
																																															}
																																																									else {
																			fs.mkdir(studioPath , function(err) {
																																							console.log('Yes it works.');
																																																								module.exports.uploadImages(fs , req , path , fields , files)
																																				})
																		}
},

'arrangeFiles' : (fs , req , path , pData , tData) => {
																																																							
																												for (var i = 0; i < req.files.photo.length; i++) {
																																																							req.files.photo.forEach(function(file) {
						pData[i] = {
													'name' : file.originalname,
																												'path' : path.resolve(file.path),
																																													'type' : file.mimetype,
																																																										'encoding' : file.encoding
																																																																								}
																																																																										})
																																																																													};
							if (req.files.trailer) {
																				for (var j = 0; j < req.files.trailer.length; j++) {
																																															req.files.trailer.forEach(function(file) {
							tData[j] = {
														'name' : file.originalname,
																												'path' : path.resolve(file.path),
																																													'type' : file.mimetype,
																																																										'encoding' : file.encoding
							}
																																																			})
																							} }
																									req.body.photo = pData , req.body.trailer = tData;
},

	'createStudio' : (studio , file , addStudio , cFile ) => {
																															addStudio.name = studio.name;
																																															addStudio.year_founded = studio.year_founded;
											addStudio.country_of_origin = studio.country_of_origin;
																																																																							addStudio.about = studio.about;
																																								addStudio.cover_image = [cFile]
																	
	},

	'multer' :  multer.diskStorage({
 																		'destination' : function (req, file, cb) {
																																								var studioPath = String('./public/studios/' + req.body.name.toLowerCase().split(' ').join('_'));
				if (fs.existsSync(studioPath)) {
  																				cb(null, studioPath);
																																} else {
																																					fs.mkdir(studioPath , function(err) {
																																																									cb(null , studioPath);
																																																				})																																														
																																													}
																											  },
							'filename' : function (req, file, cb) {
																												var ext = path.extname(file.originalname),							
																																																		fileName = req.body.name.toLowerCase().split(' ').join('_') + Date.now() + ext;
    																															cb(null, fileName)
  						}
																																																																				}),
	'uploadWare' : [{'name' : 'photo' , 'maxCount' : 5} , {'name' : 'trailer' , 'maxCount' : 3}],

	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/studio/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																			'qs' : {}			}

}

