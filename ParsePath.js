module.exports = function(path) {
	if (!path) return [];
	if (typeof path !== 'string') return [];

	var number = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9};
	var currentProperty = null;
	var isNumber = false;
	var stack = [];
	var result = [];
	for (var i = 0; i < path.length; i++) {
		var char = path[i];
		if (stack.length > 0) {
			var last = stack[stack.length - 1];
			if (last === "[" && char === "]") {
				stack.pop();
			}
			else if (last !== "[" && last === char) {
				stack.pop();
			}
			else if (last !== "'" && last !== '"' && (char === "'" || char == '"')) {
				stack.push(char);
				isNumber = false;
			}
			else if (last !== "'" && last !== '"' && char === '[') {
				stack.push(char);
			}
			else {
				currentProperty = (currentProperty || '') + char;
			}
		}
		else {
			if (char === '.') {
				if (currentProperty !== null) {
					if (isNumber) {
						var number = parseInt(currentProperty);
						if (Number.isNaN(number)) {
							throw new Error('Can not parse this path: ' + path + '. Check property: ' + currentProperty);
						}
						else {
							result.push(number);
						}
					}
					else {
						result.push(currentProperty);
					}
				}
				currentProperty = null;
				isNumber = false;
			}
			else if (char == '[') {
				if (currentProperty !== null) {
					if (isNumber) {
						var number = parseInt(currentProperty);
						if (Number.isNaN(number)) {
							throw new Error('Can not parse this path: ' + path + '. Check property: ' + currentProperty);
						}
						else {
							result.push(number);
						}
					}
					else {
						result.push(currentProperty);
					}
				}
				currentProperty = null;
				isNumber = true;
				
				stack.push(char);
			}
			else if (!currentProperty && (char === "'" || char == '"')) {
				stack.push(char);
				isNumber = false;
			}
			else if (char === ']') {
				throw new Error('Can not parse this path: ' + path + '. Check symbol: ]');
			}
			else {
				currentProperty = (currentProperty || '') + char;
			}
		}
	}

	currentProperty && result.push(currentProperty);
	if (stack.length > 0) {
		throw new Error('Can not parse this path: ' + path + '. Check symbol: ' + stack);
	}
	return result;
}