// test/unit/random/dice.spec.ts

import { expect } from 'chai';
import { create, createIterator, roll } from '../../../src/random/dice';
import { sequence } from '../../../src/random/random';

describe('Dice', function () {
  describe('roll()', function () {
    it('should roll a d1', function () {
      expect(roll(1)).to.equal(1);
    });

    it('should default to a d6', function () {
      expect(roll()).to.be.gte(1).and.lte(6);
    });

    it('should throw if not passed a safe integer', function () {
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

  describe('create()', function () {
    it('should create a 3d7 multi-roll', function () {
      const random = sequence([0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7]);
      const roll = create({ sides: 7, number: 3, random });

      let value = roll();
      expect(value.value).to.equal(6);
      expect(value.values).to.eql([1, 2, 3]);

      value = roll();
      expect(value.value).to.equal(15);
      expect(value.values).to.eql([4, 5, 6]);
    });
  });

  describe('createIterator()', function () {
    it('should be iterable', function () {
      const random = sequence([0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7]);
      const roll = createIterator({ sides: 7, number: 3, random });

      let { value } = roll.next();
      expect(value.value).to.equal(6);
      expect(value.values).to.eql([1, 2, 3]);

      ({ value } = roll.next());
      expect(value.value).to.equal(15);
      expect(value.values).to.eql([4, 5, 6]);

      expect(() => roll.next()).to.throw(RangeError);
    });

    it('should implement the iterator protocol', function () {
      const random = sequence([0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7]);
      const roll = createIterator({ sides: 7, number: 3, random });

      const [roll1, roll2] = roll;
      expect(roll1.value).to.equal(6);
      expect(roll2.value).to.equal(15);
    });

    it('should support a length', function () {
      const random = sequence([0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7]);
      const roll = createIterator({
        sides: 7,
        number: 3,
        random,
        iteratorLength: 2,
      });

      const rolls = [...roll];
      expect(rolls.length).to.equal(2);
      expect(rolls[0].value).to.equal(6);
      expect(rolls[1].value).to.equal(15);
    });
  });
});
