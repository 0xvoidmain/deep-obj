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
	},
	arr: [{
		a: {
			b: 1
		}
	}],

	'abc"de"': 2,
	'[abc"de"]': 3
}

console.log('testObject = ' + JSON.stringify(testObject, null, 4));

console.log('Test:', "assert.equal(get(testObject, 'a.b.c'), testObject.a.b.c);");
assert.equal(get(testObject, 'a.b.c'), testObject.a.b.c);
console.log('>> Ok\n');

// console.log('Test:', "get(testObject, '[\'abc\"de\"\']'), testObject['abc\"de\"'];");
// assert.equal(get(testObject, '[\'abc"de"\']'), testObject['abc"de"']);
// console.log('>> Ok\n');

// console.log('Test:', "assert.equal(get(testObject, '[\'[abc\"de\"]\']'), testObject['[abc\"de\"]']);");
// assert.equal(get(testObject, '[\'[abc"de"]\']'), testObject['[abc"de"]']);
// console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject, 'a.d[0]'), testObject.a.d[0]);");
assert.equal(get(testObject, 'a.d[0]'), testObject.a.d[0]);
console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject, ['a', 'd', 0]), testObject.a.d[0]);");
assert.equal(get(testObject, ['a', 'd', 0]), testObject.a.d[0]);
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

console.log('Test:', "assert.equal(get(testObject.arr, '[0].a.b'), testObject.arr[0].a.b);");
assert.equal(get(testObject.arr, '[0].a.b'), testObject.arr[0].a.b);
console.log('>> Ok\n');

console.log('Test:', "assert.equal(get(testObject.arr, '[0].a.b.d.e'), undefined);");
assert.equal(get(testObject.arr, '[0].a.b.d.e'), undefined);
console.log('>> Ok\n');

console.log('Test:', "set(testObject, '[\"test-abc\"].a.b[0][2]', 5);\nassert.equal(get(testObject, '[\"test-abc\"].a.b[0][2]'), 5);");
set(testObject, '["test-abc"].a.b[0][2]', 5);
assert.equal(get(testObject, '["test-abc"].a.b[0][2]'), 5);
console.log('>> Ok\n');

console.log('Test:', "set(testObject, 'a.b.c[0].ae', 10);\nassert.equal(get(testObject, 'a.b.c[0].ae'), 10);");
set(testObject, 'a.b.c[0].ae', 10);
assert.equal(get(testObject, 'a.b.c[0].ae'), 10);
console.log('>> Ok\n');

console.log('Test:', "set(testObject, 'a.b.c[0].ae.d.e.f.g.h', 10);\nassert.equal(get(testObject, 'a.b.c[0].ae.d.e.f.g.h'), undefined);");
set(testObject, 'a.b.c[0].ae.d.e.f.g.h', 10);
assert.equal(get(testObject, 'a.b.c[0].ae.d.e.f.g.h'), undefined);
console.log('>> Ok\n');

console.log('Test performance');
console.time();
for (var i = 0; i < 10000; i++) {
	get(testObject, 'a.b.c');
	get(testObject, '[\'abc"de"\']');
	get(testObject, '[\'[abc"de"]\']');
	get(testObject, 'a.d[0]');
	get(testObject, 'a.b.c[0]');
	get(testObject, 'a.b.c[0]["ae"]');
	get(testObject, 'a.b.c[0].ae');
	get(testObject, 'a.b.c[1].ae2[0]');
	get(testObject, '["test-abc"].a.b[0][2]');
	get(testObject.arr, '[0].a.b');
	get(testObject.arr, '[0].a.b.d.e');
}
console.timeEnd();

console.log('Good job');