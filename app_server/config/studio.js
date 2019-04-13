var multer = require('multer') , fs = require('fs') , path = require('path');

module.exports = {


	'multer' :  multer.diskStorage({
 																		'destination' : function (req, file, cb) {
																																								var actorPath = './public/actors/';
																																																											cb(null , actorPath);
																											  },
							'filename' : function (req, file, cb) {
																													var ext =  path.extname(file.originalname) , possible = 'abcdefghijklmnopqrstuvwxyz0123456789' , imgUrl = '' ;

																													for(var i = 0 ; i < 6 ; i += 1) {	imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));		}

																													fileName = imgUrl + ext;
	    																																								cb(null, fileName)			}
																																																																				}),
	
	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/studio/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																			'qs' : {}			} ,

	'validate' : (req , res , next) => {	if (req.file) {

		var bitmap = fs.readFileSync('./public/studios/' + req.file.filename).toString('hex' , 0 , 4);

			if (!imageMagic.checkMagic(bitmap)) {
																				
						fs.unlinkSync('./public/studios/' + req.file.filename);
																																			req.body.error = {
																																												'location' : 'body' ,
																																																							'param' : 'photo' ,
																																																																	'value' : '' ,
																																																																									'msg' : 'Only Image files Allowed'		}	}  }

				if (!req.file) {
													req.body.error2 = {
																							'location' : 'body' ,
																																		'param' : 'photo' ,
																																												'value' : '' ,
																																																				'msg' : 'Image Must be provided'		}	}
															next(); 		} 

}

