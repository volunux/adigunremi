var multer = require('multer') , fs = require('fs') , path = require('path') , imageMagic = require('./photoMagic.js') , extra = require('fs-extra') , errors = require('./errors') , key = '' , params = '' ,
 
actorS3 = require('./aws/actorAws') , actorAWS = require('./aws/actorS3') , $filename = require('./filename') , bitmap = '' , aws = require('aws-sdk') , multerS3 = require('multer-s3') , s3Conf = actorS3() , param1 = '';

aws.config.update(actorAWS);

var s3 = new aws.S3();

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
																																																																				}) ,
	
	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/actor/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																			'qs' : {}			} ,

	'validate' : (req , res , next) => {	if (req.file) {

		var bitmap = fs.readFileSync('./public/actors/' + req.file.filename).toString('hex' , 0 , 4);

			if (!imageMagic.checkMagic(bitmap)) {
																				
						fs.unlinkSync('./public/actors/' + req.file.filename);
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
															next(); 		} ,
	'mConfig' : multerS3({
    												's3' : s3Conf ,
																				    'bucket': 'actor-studio' ,
																				        												'acl': 'public-read-write' , 

			    																																'key' : (req, file, cb) => {
																																																				fileName = $filename(file);
			     																																																													 cb(null, fileName)						} ,

			    																																	'metadata' : (req , file , cb) => {
			    																																																				cb(null , {'fieldName' : file.fieldname})				}
															})
}