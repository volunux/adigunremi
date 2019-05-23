var multer = require('multer') , fs = require('fs') , path = require('path') , imageMagic = require('./photoMagic.js') , extra = require('fs-extra') , errors = require('./errors') , key = '' , params = '' ,
 
titleS3 = require('./aws/titleAws') , titleAWS = require('./aws/titleS3') , $filename = require('./filename') , bitmap = '' , aws = require('aws-sdk') , multerS3 = require('multer-s3') , s3Conf = titleS3() ,

param1 = '' , deleteFiles = require('./delete') , titlePath = '' , deleteItems = [] , bitmapper = '';

aws.config.update(titleAWS);

var s3 = new aws.S3();

module.exports = {

	'uploadWare' : [{'name' : 'photo' , 'maxCount' : 5}] ,

	'checkFileUpload' : (req , res , next) => {

		if (!(req.files.photo.length !== 0)) {		req.body.error2 = errors.error4;		}
																																											next();
	} ,
	
	'validateFileUpload' : (req , res , next) => {

																								req.files.photo.forEach((x) => {
																										
																										key = x.key ;

																										params = {'Bucket' : 'actor-aremi' , 'Key' : key };
																										
																										s3.getObject(params , (err , data) => { 
																																																if (data) { console.log('Yes'); }
																											
																					if (data) {		bitmapper = data.Body;	}

																						if (bitmapper)	bitmap = bitmapper.toString('hex' , 0 , 4);	});

																										deleteItems.push({'Key' : x.key});
 												});	

																					params = {
																											'Bucket' : 'actor-aremi' , 
																																									'Delete' : {
																																																'Objects': deleteItems , 
																																																													'Quiet' : false		}		};
																				if(req.body.error4) {
																																s3.deleteObjects(params , (err , data) => {
																																																								if (err) console.log(err)     
																																																																					else console.log("Successfully deleted myBucket/myKey");   
																																																					});		}
																									next();
	} ,

	'addFileUpload' : (req , res , next) => {
																							if (req.files.photo) {
																																						req.body.photo = req.files.photo;
																							}
			next();
	} ,

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

	'mConfig' : multerS3({
													's3' : s3Conf ,
																			    'bucket': 'actor-aremi' ,
																			        												'acl': 'public-read-write' , 

			    																																'key' : (req , file , cb) => {
			    																																																	if (req.body.title) {

														    																																		titlePath = req.body.title.replace(/[^a-zA-Z 0-9]+/g , '').toLowerCase().split(' ').join('_');								
			    																																										}
			    																																																if (!req.body.title) {

																																																		titlePath = req.session.compiledTitle.title.replace(/[^a-zA-Z 0-9]+/g , '').toLowerCase().split(' ').join('_');
			    																																										}
																																																		fileName = `titles/${titlePath}/${$filename(file)}`;
			     																																																				
			     																																																				cb(null, fileName)															} ,

			    																																	'metadata' : (req , file , cb) => {
			    																																																				cb(null , {'fieldName' : file.fieldname})				}
															}) ,

	'reqOptions' : {		'url' : 'http://limitless-stream-60828.herokuapp.com/api/title/' ,
																																		'method' : 'GET' ,
																																												'json' : {},
																																																				'qs' : {}	
							}
}