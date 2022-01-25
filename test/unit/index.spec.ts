// test/random/random.spec.ts

import { expect } from 'chai';

import { version } from '../../src/index';
import { version as pkgVersion } from '../../package.json';

describe('The typescript entry point', function () {
  it('should export the right version', function () {
    expect(version).to.equal(pkgVersion);
  });
});
