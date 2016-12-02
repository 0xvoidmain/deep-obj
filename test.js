var assert = require('assert');
var DeepObject = require('./index');

var get = DeepObject.get;
var set = DeepObject.set;

var testObject = {
	a: {
		b: {
			c: [{
				ae: 1
			}, {
				ae2: ['demoo']
			}]
		},
		d: [1,2,3]
	},
	'test-abc': {
		a: {
			b: [[1, 2, 3], [4, 5, 6]]
		}
	}
}

console.log('testObject = ' + JSON.stringify(testObject, null, 4));

console.log('Test:', "assert.equal(get(testObject, 'a.b.c'), testObject.a.b.c);");
assert.equal(get(testObject, 'a.b.c'), testObject.a.b.c);
console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject, 'a.d[0]'), testObject.a.d[0]);");
assert.equal(get(testObject, 'a.d[0]'), testObject.a.d[0]);
console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject, 'a.b.c[0]'), testObject.a.b.c[0]);");
assert.equal(get(testObject, 'a.b.c[0]'), testObject.a.b.c[0]);
console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject, 'a.b.c[0][\"ae\"]'), testObject.a.b.c[0][\"ae\"]);");
assert.equal(get(testObject, 'a.b.c[0]["ae"]'), testObject.a.b.c[0]["ae"]);
console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject, 'a.b.c[0].ae'), testObject.a.b.c[0].ae);");
assert.equal(get(testObject, 'a.b.c[0].ae'), testObject.a.b.c[0].ae);
console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject, 'a.b.c[1].ae2[0]'), testObject.a.b.c[1].ae2[0]);");
assert.equal(get(testObject, 'a.b.c[1].ae2[0]'), testObject.a.b.c[1].ae2[0]);
console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject, '[\"test-abc\"].a.b[0][2]'), testObject[\"test-abc\"].a.b[0][2]);");
assert.equal(get(testObject, '["test-abc"].a.b[0][2]'), testObject["test-abc"].a.b[0][2]);
console.log('>> Ok\n');

console.log('Test:', "set(testObject, '[\"test-abc\"].a.b[0][2]', 5);\nassert.equal(get(testObject, '[\"test-abc\"].a.b[0][2]'), 5);");
set(testObject, '["test-abc"].a.b[0][2]', 5);
assert.equal(get(testObject, '["test-abc"].a.b[0][2]'), 5);
console.log('>> Ok\n');

console.log('Test:', "set(testObject, 'a.b.c[0].ae', 10);\nassert.equal(get(testObject, 'a.b.c[0].ae'), 10);");
set(testObject, 'a.b.c[0].ae', 10);
assert.equal(get(testObject, 'a.b.c[0].ae'), 10);
console.log('>> Ok\n');

console.log('Good job');