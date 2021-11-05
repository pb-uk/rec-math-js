// test/dist/esm/index.spec.ts

import { expect } from 'chai';
import { readFile } from 'fs/promises';

import * as cjsModule from '../../cjs/dist/index.js';

const pkgVersion = JSON.parse(
  await readFile(new URL('../../package.json', import.meta.url))
).version;

describe('The Common JS module', function () {
  it('should export the right version', function () {
    expect(cjsModule.version).to.equal(pkgVersion);
  });
});
