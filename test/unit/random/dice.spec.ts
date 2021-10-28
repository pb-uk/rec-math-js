// test/unit/random/dice.spec.ts

import { expect } from 'chai';
import { roll } from '../../../src/random/dice';

describe('Dice', function () {
  it('should roll a d1', function () {
    expect(roll(1)).to.equal(1);
  });

  it('should throw if not passed a safe integer', function () {
    // @ts-expect-error Expects a number.
    expect(() => roll()).to.throw(TypeError);
    // @ts-expect-error Expects a number.
    expect(() => roll('1')).to.throw(TypeError);
    // @ts-expect-error Expects a number.
    expect(() => roll(null)).to.throw(TypeError);
    expect(() => roll(0)).to.throw(RangeError);
    expect(() => roll(1.1)).to.throw(RangeError);
    expect(() => roll(Number.MAX_SAFE_INTEGER + 1)).to.throw(RangeError);
    expect(() => roll(Number.NaN)).to.throw(RangeError);
    expect(() => roll(Number.MAX_SAFE_INTEGER)).not.to.throw();
  });
});
