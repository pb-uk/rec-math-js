// test/unit/index.test.js

import { version } from '../../src/index';
const { version: pkgVersion } = require('../../package.json');

describe('The boilerplate source code', () => {
  it('should have the same version as package.json', () => {
    expect(version).toBe(pkgVersion);
  });
});
