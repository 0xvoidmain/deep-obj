var parsePath = require('./ParsePath');

var hasOwnProp = Object.prototype.hasOwnProperty;

function get(obj, path) {
	if (path === undefined || path === null) {
		return obj;
	}
	var result = null;
	var keys = typeof path == 'string' ? 
					parsePath(path) : 
					Array.isArray(path) ? path : [path];
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
}

function set(obj, path, value) {
	if (path === undefined || path === null) {
		return false;
	}
	var keys = typeof path == 'string' ? 
					parsePath(path) : 
					Array.isArray(path) ? path : [path];
	for (var i = 0; i < keys.length - 1; i++) {
		var key = keys[i];
		if (!hasOwnProp.call(obj, key)) {
			return false;
		};
		obj = obj[key];
	}
	obj[keys[i]] = value;
	return true;
}

module.exports = {
	parse: parsePath,
	set: set,
	get: get
}