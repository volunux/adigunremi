module.exports = {

	'createActor' : (aBody , reqBody) => {

			aBody = reqBody;

			aBody.cover_image = [];
															aBody.cover_image.push( {
																												'name' : reqBody.fileName,
																																										'path' : reqBody.path,
																																																						'mimetype' : reqBody.type,
																																																																				'encoding' : reqBody.encoding		})

			delete aBody.fileName;
															delete aBody.path;
																									delete aBody.type;	
																																			delete aBody.encoding;
		console.log(aBody);
														}
}