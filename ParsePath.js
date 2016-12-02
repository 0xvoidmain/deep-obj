module.exports = function(path) {
	if (!path) return [];
	if (typeof path !== 'string') return [];

	return path.replace(/"|'/g, '')
				.replace(/\[|\]/g, '.')
				.replace(/\.+/g, '.')
				.replace(/^\.|\.$/g, '')
				.split('.');
}