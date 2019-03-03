var fs = require('fs');

module.exports = {

	'createDir' : function(res , path , folder , photoname) {
																															fs.rename(path , './public/images/' + folder + '/' + photoname + '.jpg' ,	function(err) {																																											
								res.render('form/title-actor-add');								
																																											})
	}

}