var multer = require('multer') , fs = require('fs') , path = require('path') , imageMagic = require('./photoMagic.js') , extra = require('fs-extra') , errors = require('./errors') , key = '' , params = '' ,
 
studioS3 = require('./aws/studioAws') , studioAWS = require('./aws/studioS3') , $filename = require('./filename') , bitmap = '' , aws = require('aws-sdk') , multerS3 = require('multer-s3') , s3Conf = studioS3() , param1 = '';

aws.config.update(studioAWS);

var s3 = new aws.S3();

module.exports = {
	
	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/studio/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																			'qs' : {}			} ,

	'validate' : (req , res , next) => {	if (req.file) {
		
		key = req.file.key , params = {'Bucket' : 'actor-studio' , 'Key' : key };
																																								s3.getObject(params , (err , data) => {		bitmap = data.Body.toString('hex' , 0 , 4);		});

			if (!imageMagic.checkMagic(bitmap)) {		
																							bitmap = '' ;	param1 = {'Bucket' : 'actor-studio' , 'Delete' : {
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
																				    'bucket': 'actor-studio' ,
																				        												'acl': 'public-read-write' , 

			    																																'key' : (req, file, cb) => {
																																																				fileName = $filename(file);
			     																																																													 cb(null, fileName)						} ,

			    																																	'metadata' : (req , file , cb) => {
			    																																																				cb(null , {'fieldName' : file.fieldname})				}
															})
}