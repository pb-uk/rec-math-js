// test/func/index.test.js

const { version } = require('../..');
const { version: pkgVersion } = require('../../package.json');

describe('Functional tests run against the Common JS module', () => {
  describe('The boilerplate source code', () => {
    it('should have the same version as package.json', () => {
      expect(version).toBe(pkgVersion);
    });
  });
});
