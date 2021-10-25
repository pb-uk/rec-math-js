// test/unit/random/dice.spec.ts

import { expect } from 'chai';
import { roll } from '../../../src/random/dice';

describe('Dice', function () {
  it('should roll a d6 by default', function () {
    expect(roll())
      .to.satisfy(Number.isInteger)
      .and.to.be.gte(1)
      .and.to.be.lte(6);
  });

  it('should roll a d1', function () {
    expect(roll(1)).to.satisfy(Number.isInteger).and.to.equal(1);
  });
});
