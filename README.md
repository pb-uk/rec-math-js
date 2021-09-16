# RecMath

> Recreational mathemetics including games and puzzle solvers.

## Getting Started: in a web page

Current major browsers are supported but not Internet Explorer (edit `targets`
in `rollup.config.js` and run `npm run build` to change this).

Load the script from the CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/rec-math@1"></script>
```

The module is exported as `RecMath`:

```html
<script>
  document.write(RecMath.version);
</script>
```

## Getting Started: in Node.js

Node >= 12 is currently supported in the distributed modules.

Install from `npm`:

```console
$ npm i rec-math
```

Require CommonJS module:

```js
// Default should work...
const RecMath = require('rec-math');
// ...or specify CommonJS module.
const RecMath = require('rec-math/dist/cjs');
```

or import as an ES6 module:

```js
// Default should work...
import RecMath from 'rec-math';
// ...or specify ES6 module.
import RecMath from 'rec-math/dist/esm';
```

## Documentation

## Development

```console
$ # Run unit tests.
$ npm run test:unit
$
$ # Build and run all tests.
$ npm run build
$ npm run test
```

## Contributing

## License

Distributed under the MIT License. See [LICENSE] for more information.

## Contact

## Acknowledgements
