// test/dist/index.spec.js

const cjs = require('../../dist/cjs');
import * as esm from '../../dist/esm';

const { version: pkgVersion } = require('../../package.json');

describe('Test the Common JS modules', () => {
  describe('The main entry point', () => {
    it('should have the same version as package.json', () => {
      expect(cjs.version).toBe(pkgVersion);
    });
  });
});

describe('Test the ES modules', () => {
  describe('The main entry point', () => {
    it('should have the same version as package.json', () => {
      expect(esm.version).toBe(pkgVersion);
    });
  });
});
