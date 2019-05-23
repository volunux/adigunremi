var multer = require('multer') , fs = require('fs') , path = require('path') , request = require('request') , imageMagic = require('./photoMagic.js') , extra = require('fs-extra');

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
 

	'multer' :  multer.diskStorage({
 																		'destination' : function (req, file, cb) {
																																							var titlePath = './public/titles/' + req.body.title.replace(/[^a-zA-Z 0-9]+/g , '').toLowerCase().split(' ').join('_');
				if (fs.existsSync(titlePath)) {
	  																		cb(null, titlePath);
																															} else {
																																				fs.mkdir(titlePath , function(err) {
																																																							cb(null , titlePath);
																																																			})																																														
																																													}
																											  },
							'filename' : function (req, file, cb) {
																													var ext =  path.extname(file.originalname) , possible = 'abcdefghijklmnopqrstuvwxyz0123456789' , imgUrl = '' ;

																													for(var i = 0 ; i < 6 ; i += 1) {	imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));		}

																													fileName = imgUrl + ext;
	    																																								cb(null, fileName)			}
																																																																				}),

	'uploadWare' : [{'name' : 'photo' , 'maxCount' : 5} , {'name' : 'trailer' , 'maxCount' : 1}, {'name' : 'cover_image' , 'maxCount' : 1}] ,

	'checkFileUpload' : (req , res , next) => { var titlePath = './public/titles/' + req.body.title.replace(/[^a-zA-Z 0-9]+/g , '').toLowerCase().split(' ').join('_');

																					
		if (!(req.files.photo.length !== 0)) {
																									req.body.error2 = {
																																			'location' : 'body' ,
																																														'param' : 'photo' ,
																																																								'value' : '' ,
																																																																'msg' : 'At least 1 photo must be provided'		}	
																									extra.emptyDirSync(titlePath);				}

																						next();
	} ,
	
	'validateFileUpload' : (req , res , next) => {
		

		if (req.files.photo) {
																		req.files.photo.forEach((x) => {	

																			try {		var bitmap = fs.readFileSync(x.path).toString('hex' , 0 , 4);		}  catch (err) { console.log(err); }


				if (!imageMagic.checkMagic(bitmap)) {
																					
		extra.emptyDirSync(x.destination);

																			req.body.error4 = {
																													'location' : 'body' ,
																																								'param' : 'photo' ,
																																																		'value' : '' ,
																																																										'msg' : 'Only Image files Allowed'		}	} 
																		})	}
									next();
	} ,

	'addFileUpload' : (req , res , next) => {
																							if (req.files.cover_image) {
																																						req.body.cover_image = req.files.cover_image;
																							}

																							if (req.files.photo) {
																																						req.body.photo = req.files.photo;
																							}

																							if (req.files.trailer) {
																																						req.body.trailer = req.files.trailer;
																							}
			next();
	} ,

	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/title/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																				'qs' : {}	
							}
}