module.exports = { 

	'deleteFiles' : (req , res , next) => {

		if (!(req.files.cover_image.length !== 0)) {
																									req.files.cover_image.forEach((item) => {

																														deleteItems.push({'Key' : item.key});

																														req.body.error1 = errors.error5;

																								});		}

		if (!(req.files.photo.length !== 0)) {																						
																									req.files.photo.forEach((item) => {

																														deleteItems.push({'Key' : item.key});

																														req.body.error2 = errors.error4;
																								});		}

		if (!(req.files.trailer.length !== 0)) {			
																									req.files.trailer.forEach((item) => {

																											deleteItems.push({'Key' : item.key});
																						})		}

																						var params = {
																														'Bucket' : 'actor-aremi' , 
																																												'Delete' : {
																																																			'Objects': deleteItems , 
																																																																'Quiet' : false		}
																																					};

																							s3.deleteObjects(params , (err , data) => {
																																																if (err) console.log(err)     
																																																													else console.log("Successfully deleted myBucket/myKey");   
				});		
							} ,

		'validateFiles' : (req , res , next) => {
																								req.files.cover_image.forEach((x) => {
																										
																										key = x.key ; params = {'Bucket' : 'actor-studio' , 'Key' : key };
																										
																										s3.getObject(params , (err , data) => {		bitmap = data.Body.toString('hex' , 0 , 4);		});
																				
																				if (!imageMagic.checkMagic(bitmap)) {
																																							deleteItems.push({'Key' : x.key});				
																																																									req.body.error3 = errors.error3	} 
																													});	

																								req.files.photo.forEach((x) => {
																										
																										key = x.key ; params = {'Bucket' : 'actor-studio' , 'Key' : key };
																										
																										s3.getObject(params , (err , data) => {		bitmap = data.Body.toString('hex' , 0 , 4);		});

																				
																				if (!imageMagic.checkMagic(bitmap)) {
																																								deleteItems.push({'Key' : x.key});
																																																										req.body.error4 = errors.error	} 
																													});	

																					var params = {
																														'Bucket' : 'actor-aremi' , 
																																												'Delete' : {
																																																			'Objects': deleteItems , 
																																																																'Quiet' : false		}
																																					};

																							s3.deleteObjects(params , (err , data) => {
																																																if (err) console.log(err)     
																																																													else console.log("Successfully deleted myBucket/myKey");   
																																													});
																																							}
}