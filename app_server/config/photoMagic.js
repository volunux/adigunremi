module.exports = {

		'magic' : {
									'jpg' : 'ffd8ffe0' ,
																				'jpg1' : 'ffd8ffe1' ,
																															'png' : '89504e47' ,
																																										'gif' : '47494638'
		} ,

		'checkMagic' : (magic) => {
																var fMagic = module.exports.magic;
																																				if (magic == fMagic.jpg || magic == fMagic.jpg1 || magic == fMagic.png || magic == fMagic.gif ) {

																																														return true;
																																				} 
		}

}