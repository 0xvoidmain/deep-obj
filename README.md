# DeepObject

Set and get values on objects via dot-notation strings.

## Example

```js
var DeepObject = require('deep-obj');
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
	'abc"de"': 1,
	'abc"de"': 2
}

console.log(get(testObject, 'a.b.c'), testObject.a.b.c);

console.log(get(testObject, '[\'abc"de"\']'), testObject['abc"de"']);

console.log(get(testObject, '[\'[abc"de"]\']'), testObject['[abc"de"]']);

console.log(get(testObject, 'a.d[0]'), testObject.a.d[0]);

console.log(get(testObject, 'a.b.c[0]'), testObject.a.b.c[0]);

console.log(get(testObject, 'a.b.c[0]["ae"]'), testObject.a.b.c[0]["ae"]);

console.log(get(testObject, 'a.b.c[0].ae'), testObject.a.b.c[0].ae);

console.log(get(testObject, 'a.b.c[1].ae2[0]'), testObject.a.b.c[1].ae2[0]);

console.log(get(testObject, '["test-abc"].a.b[0][2]'), testObject["test-abc"].a.b[0][2]);

console.log(get(testObject.arr, '[0].a.b'), testObject.arr[0].a.b));

console.log(get(testObject.arr, '[0].a.b.d.e'), undefined));

set(testObject, '["test-abc"].a.b[0][2]', 5);
console.log(get(testObject, '["test-abc"].a.b[0][2]'), 5);

set(testObject, 'a.b.c[0].ae', 10);
console.log(get(testObject, 'a.b.c[0].ae'), 10);

set(testObject, 'a.b.c[0].ae.d.e.f.g.h', 10);
console.log(get(testObject, 'a.b.c[0].ae.d.e.f.g.h'), undefined);

```

## API

### DeepObject.get(object, path)

Where `path` is a string like `foo.bar` or `foo.bar[0][1]` or `[0][1].foo['bar']`.

The function will return an VALUE or undefined

### DeepObject.set(object, path, value)

Where `path` is a string like `foo.bar` or `foo.bar[0][1]` or `[0][1].foo['bar']`.

The function return TRUE or FALSE. Return TRUE if it can set value with the path

### DeepObject.parse(path)
Where `path` is a string like `foo.bar` or `foo.bar[0][1]` or `[0][1].foo['bar']`.

The function will return an array of path;

Ex:

`foo.bar` => `['foo', 'bar']`

`foo.bar[0][1]` => `['foo', 'bar', 0, 1]` 

`[0][1].foo['bar']` => `[0, 1, 'foo', 'bar']`

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install deep-obj
```

## License

MIT