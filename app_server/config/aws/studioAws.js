const aws = require('aws-sdk');

module.exports = function studioS3() {

				return new aws.S3({
													    'secretAccessKey': 'uw0OKjDQp8f+pcYJ1YZrnuEgROLjVII9DCDgjG/e' ,
																																														    'accessKeyId': 'AKIAI4TIKRE6CRCIYQ7Q' ,
													    																																																						'region' : 'us-east-1' ,
													    																																																																			'Bucket' : 'actor-studio'
});

}