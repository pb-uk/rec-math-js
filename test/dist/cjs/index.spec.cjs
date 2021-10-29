// test/dist/cjs/index.spec.ts

import { expect } from 'chai';

// import * as cjsModule from '../../../dist/cjs/index';
import * as cjsModule from '../../..';
import { version as pkgVersion } from '../../package.json';

describe('The Common JS module', function () {
  it('should export the right version', function () {
    expect(cjsModule.version).to.equal(pkgVersion);
  });
});
