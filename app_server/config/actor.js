var multer = require('multer') , fs = require('fs') , path = require('path') , request = require('request') , imageMagic = require('./photoMagic.js') , extra = require('fs-extra');

const multerS3 = require('multer-s3');

const aws = require('aws-sdk');

aws.config.update({
																																		    // Your SECRET ACCESS KEY from AWS should go here,
																																		    // Never share it!
																																		    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: "uw0OKjDQp8f+pcYJ1YZrnuEgROLjVII9DCDgjG/e" ,
																																		    // Not working key, Your ACCESS KEY ID from AWS should go here,
																																		    // Never share it!
																																		    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: "AKIAI4TIKRE6CRCIYQ7Q" ,
    region: 'us-east-1'																								 // region of your bucket
});

const s3 = new aws.S3();


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
					})	,

	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/actor/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																			'qs' : {}			},
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
																next(); 		} 
}
