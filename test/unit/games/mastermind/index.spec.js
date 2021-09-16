// const { solverFactory } = require('mastermind-solver');
import { solverFactory, version } from '../../../../src/games/mastermind';
import pkg from '../../../../package.json';

describe('The Mastermind solver', () => {
  it('should have the same version as package.json', () => {
    expect(version).toBe(pkg.version);
  });

  describe('The cjs module', () => {
    it('should check marks in any shape', () => {
      const game = solverFactory();
      expect(game.getMark([0, 1, 2, 3], [0, 1, 2, 3])).toEqual([4, 0]);
      expect(game.getMark([0, 1, 2, 3], [1, 2, 3, 0])).toEqual([0, 4]);
      expect(game.getMark([0, 1, 2], [2, 1, 99])).toEqual([1, 1]);
    });

    describe('should build a simple tree for 3 holes and 2 colours', () => {
      const solved = solverFactory({ length: 3, radix: 2 })
        .buildSolutionTree()
        .getStats();

      it('should have 8 possible secrets', () => {
        expect(solved.count).toBe(8);
      });

      it('should take a maximum of 3 rounds', () => {
        expect(solved.max).toBe(3);
      });

      it('should take a total of 18 rounds for all games', () => {
        expect(solved.total).toBe(18);
      });

      it("should take a total of 21 rounds with Knuth's original strategy", () => {
        const solved = solverFactory({ length: 3, radix: 2, strategy: 'knuth' })
          .buildSolutionTree()
          .getStats();

        expect(solved.total).toBe(21);
      });
    });
  });
});
