var multer = require('multer') , fs = require('fs') , path = require('path');

module.exports = {

'uploadImage' : (fs , req , path , fields , file) => {
																																																						var tempPath = path.resolve(file.path),
																									 ext = path.extname(file.name).toLowerCase(),
																									 																												tPath = fields.actor.toLowerCase().split(' ').join('_'),
		targetPath = './public/actors/' + tPath + '/' + tPath + Date.now() + ext;																
																																																		if (ext) {
																																																								fs.rename(tempPath , targetPath , function(err) {					
																																							console.log('finally');
																																																									})
																																																					}
	

																	},
 
'checkActorPath' : (fs , req , path , fields , files) => {
																														var actorPath = './public/actors/' + fields.actor.toLowerCase().split(' ').join('_');
																																																																									if (fs.exists(actorPath)) {
																		module.exports.uploadImage(fs , req , path , fields , files);
																																																			console.log('No');
																																															}
																																																									else {
																			fs.mkdir(actorPath , function(err) {
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

	'createActor' : (actor , file = undefined, addActor , cFile = undefined ) => {
																																									addActor.name = actor.name;
																																																							addActor.nickname = actor.nickname;
																																																																									addActor.occupation = actor.occupation;
				addActor.date_of_birth = actor.date_of_birth;	
																											addActor.gender = actor.gender;
																																											addActor.nationality = actor.nationality;
																																																																	addActor.place_of_birth = actor.place_of_birth;
				addActor.country_of_origin = actor.country_of_origin;
																															addActor.state_of_origin = actor.state_of_origin;
																																																									addActor.networth = actor.networth;	
			addActor.partner_vs_spouse = actor.partner_vs_spouse;
																														addActor.sp_facebook = actor.sp_facebook;
																																																			addActor.sp_twitter = actor.sp_twitter;
			addActor.sp_instagram = actor.sp_instagram;
																									addActor.sp_others = actor.sp_others;
																																													addActor.biography = actor.biography;
			addActor.fileName = file.originalname;
																							addActor.path = file.path;
																																					addActor.type = file.mimetype;
																																																					addActor.encoding = file.encoding;
																	
	},

	'multer' :  multer.diskStorage({
 																		'destination' : function (req, file, cb) {
																																								var actorPath = String('./public/actors/' + req.body.name.toLowerCase().split(' ').join('_'));
				if (fs.existsSync(actorPath)) {
  																		cb(null, actorPath);
																														} else {
																																				fs.mkdir(actorPath , function(err) {
																																																								cb(null , actorPath);
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

	'reqOptions' : {		'url' : 'http://localhost:3000/api/actor/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																			'qs' : {}			},
	'fileLoop' : (file , uFile) => {
																		if (uFile) {

				for (var i in uFile) {																																														
																file.name = uFile.originalname;
																																file.path = uFile.path;
																																												file.type = uFile.mimetype;
																																																										file.encoding = uFile.encoding;		}	
																										}
	},

	'fileAttach' : (req , uFile) => {
																			req.body.cover_image = [];
																																	req.body.cover_image.push(uFile)
							
	}

}