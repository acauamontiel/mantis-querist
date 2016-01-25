var utils = require('stylus').utils;

module.exports = function () {
	return function (styl) {
		styl.include(__dirname + '/src');

		styl.define('key-index', function(obj, prop) {
			var i = 0;

			obj = utils.unwrap(obj);
			prop = prop.first.val;

			for (var p in obj.nodes[0].vals) {
				if (p === prop) {
					return i;
				}

				i++;
			}

			return false;
		}, true);

		styl.define('fn-name', function(e) {
			var calling = this.calling;
			return calling[calling.length - 2];
		}, true);
	}
}
