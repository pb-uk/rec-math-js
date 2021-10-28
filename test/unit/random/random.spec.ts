// test/random/random.spec.ts

import { expect } from 'chai';
import { constant, math } from '../../../src/random/random';

describe('Pseudo-random number generators', function () {
  it('should be Math.random by default', function () {
    const random = math();
    expect(random).to.equal(Math.random);
  });

  describe('The `constant` pseudo-random number generator', function () {
    it('should return a constant value', function () {
      const random = constant(0.5);

      expect(random()).to.equal(0.5);
    });

    it('should default to generating 0', function () {
      const random = constant();

      expect(random()).to.equal(0);
    });

    it('should throw if not passed a number', function () {
      // @ts-expect-error Expects a number.
      expect(() => constant('0.1')).to.throw(TypeError);
      // @ts-expect-error Expects a number.
      expect(() => constant(null)).to.throw(TypeError);
      // x@ts-expect-error Expects a number.
      expect(() => constant(Number.NaN)).to.throw(RangeError);
    });

    it('should throw if not passed a number between 0 and 1', function () {
      expect(() => constant(-0.1)).to.throw(RangeError);
      expect(() => constant(0)).not.to.throw();
      expect(() => constant(1)).to.throw(RangeError);
    });
  });
});
