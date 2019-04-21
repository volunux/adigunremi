var multer = require('multer') , fs = require('fs') , path = require('path') , imageMagic = require('./photoMagic.js') , extra = require('fs-extra') , errors = require('./errors') , key = '' , params = '' ,
 
actorS3 = require('./aws/actorAWS') , actorAWS = require('./aws/actorS3') , $filename = require('./filename') , bitmap = '' , aws = require('aws-sdk') , multerS3 = require('multer-s3') , s3Conf = actorS3() , param1 = '';

aws.config.update(actorAWS);

var s3 = new aws.S3();

module.exports = {

	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/actor/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																			'qs' : {}			},
	'validate' : (req , res , next) => {	if (req.file) {

		console.log(req.file);

		key = req.file.key , params = {'Bucket' : 'actor-aremi' , 'Key' : key };
																																								s3.getObject(params , (err , data) => {		bitmap = data.Body.toString('hex' , 0 , 4);		});

			if (!imageMagic.checkMagic(bitmap)) {		
																							bitmap = '' ;	param1 = {'Bucket' : 'actor-aremi' , 'Delete' : {
																																																							'Objects' : [
																																																														{'Key' : key }	
																																																																						] ,
																																																																								'Quiet' : false } };


																				s3.deleteObjects(param1 , (err, data) => {
																																										if (err) console.log(err)   });
																																																												req.body.error = errors.error 		}  }
				if (!req.file) {	req.body.error2 = errors.error2			}

																																		next(); 		
																	} ,
	'mConfig' : multerS3({
    												's3' : s3Conf ,
																				    'bucket': 'actor-aremi' ,
																				        												'acl': 'public-read-write' , 

			    																																'key' : (req, file, cb) => {
																																																				fileName = $filename(file);
			     																																																													 cb(null, fileName)						} ,

			    																																	'metadata' : (req , file , cb) => {
			    																																																				cb(null , {'fieldName' : file.fieldname})				}
															})
}
