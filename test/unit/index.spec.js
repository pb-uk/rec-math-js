// test/unit/index.spec.js

import { version } from '../../src/index';
const { version: pkgVersion } = require('../../package.json');

describe('The main entry point', () => {
  it('should have the same version as package.json', () => {
    expect(version).toBe(pkgVersion);
  });
});
