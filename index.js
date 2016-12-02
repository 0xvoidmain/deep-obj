var parsePath = require('./ParsePath');

var hasOwnProp = Object.prototype.hasOwnProperty;

function get(obj, path) {
	var result = null;
	try {
		var keys = parsePath(path);
		result = obj
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (!result || !hasOwnProp.call(result, key)) {
				result = undefined;
				break;
			}
			result = result[key];
		}
		return result;
	} catch (ex) {
		console.log(ex);
		return undefined;
	}
}

function set(obj, path, value) {
	try {
		var keys = parsePath(path);
		for (var i = 0; i < keys.length - 1; i++) {
			var key = keys[i];
			if (!hasOwnProp.call(obj, key)) {
				obj[key] = {}
			};
			obj = obj[key];
		}
		obj[keys[i]] = value;
	} catch (ex) {

	}
}

module.exports = {
	parse: parsePath,
	set: set,
	get: get
}