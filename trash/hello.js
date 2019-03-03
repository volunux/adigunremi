function sqr(num) {

		return num * num * num;
};

function check(arg1) {

	var arg1_ = (typeof arg1 === 'number') ? arg1 : null;

	var callback_ = arguments[arguments.length - 1];

	var callback = typeof callback_ == 'function' ? callback_ : null;

		if(!arg1) {

				return callback(new Error('Error has occured'))
		};

			process.nextTick(function() {

					var data = sqr(arg1);

						callback(data);

			});
}

function hello(dat) {

	console.log('Hello and Good day Yusuf and this is your data ' + dat);

};

console.log('Hello 1');

console.log('Hello 2');

check(23 , hello);

console.log('Hello 0');