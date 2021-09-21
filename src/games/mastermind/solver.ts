// src/solver.js

import { objectMax } from './helpers';

export class Solver {
  constructor({ radix = 6, length = 4 } = {}) {
    this.radix = radix;
    this.length = length;
    this.codes = this.getCodes();
    this.solvedMarkKey = [this.length, 0].join();
  }

  /**
   * Get all possible codes for this game.
   *
   * @return {Integer[][]} Array of all possible codes in array form.
   */
  getCodes() {
    const count = this.radix ** this.length;
    const codes = [];
    for (let i = 0; i < count; ++i) {
      codes[i] = this.getCodeFromIndex(i);
    }
    return codes;
  }

  /**
   * Check a guess against a secret.
   *
   * @param {Integer[]} guess  A guess code e.g. [0, 1, 2, 3].
   * @param {Integer[]} secret A secret code e.g. [2, 2, 2, 2].
   * @return {[Integer, Integer]} The mark as an array [right places, right colours].
   */
  getMark(guess, secret) {
    // Check right value in any place.
    let rightValues = 0;
    const valuesCount = this.getValuesCount(guess);
    const secretValuesCount = secret
      ? this.getValuesCount(secret)
      : this.secretValuesCount;
    valuesCount.forEach((count, i) => {
      rightValues += Math.min(secretValuesCount[i] ?? 0, count);
    });

    // Check right value in right place.
    const _secret = secret ?? this.secret;
    let rightPlaces = 0;
    for (let i = 0; i < guess.length; ++i) {
      if (_secret[i] === guess[i]) {
        ++rightPlaces;
        --rightValues;
      }
    }
    return [rightPlaces, rightValues];
  }

  /**
   * Get statistics after building the solution tree.
   *
   * @return {Object} Statistics (needs documenting).
   */
  getStats() {
    const rounds = [0];
    this.codes.forEach((secret) => {
      const solution = this.play(secret);
      const { guess, mark } = solution[solution.length - 1];
      if (guess !== secret) {
        throw new Error('Incorrect solution' + guess + secret);
      }
      if (mark.join() !== this.solvedMarkKey) {
        throw new Error('Solution marked incorrect ' + guess + secret + mark);
      }
      rounds[solution.length] = (rounds[solution.length] ?? 0) + 1;
    });
    const [count, total] = rounds.reduce(
      ([count, total], value, index) => [count + value, total + value * index],
      [0, 0]
    );
    return {
      max: rounds.length - 1,
      mean: total / count,
      count,
      total,
      rounds,
    };
  }

  // *** Refactoring so after here may move out of public interface. ***********

  // Iterate over a set of secrets, counting marks for a guess.
  countPossibleMarks(guess, secrets) {
    const marks = {};

    let mark;
    const { length } = secrets;
    for (let i = 0; i < length; ++i) {
      mark = this.getMark(guess, secrets[i]).join();
      marks[mark] = (marks[mark] ?? 0) + 1;
    }
    return marks;
  }

  // Get the best guess for a set of possible secrets.
  getBestGuess(possible) {
    // If there are < 3 possibilities, just choose the first one.
    if (possible.length < 3) {
      return possible[0];
    }
    // Iterate over all guesses.
    let marks, maxRemaining, miniMaxGuess;
    let miniMax = Infinity;
    let bestGuessIsASolution = false;
    this.codes.forEach((guess) => {
      // Get the sizes of the remaining possible secrets sets for each mark.
      marks = this.countPossibleMarks(guess, possible);
      maxRemaining = objectMax(marks) ?? Infinity;
      if (maxRemaining < miniMax) {
        // The 'error' on the next line performs marginally better than Knuth's
        // strategy for the (4, 6) game at least.
        bestGuessIsASolution = false;
        miniMax = maxRemaining;
        miniMaxGuess = guess;
      } else if (
        maxRemaining === miniMax &&
        !bestGuessIsASolution &&
        (marks[this.solvedMarkKey] ?? false)
      ) {
        bestGuessIsASolution = true;
        miniMaxGuess = guess;
      }
    });
    return miniMaxGuess;
  }

  // Translate a valid code to its index.
  getIndexFromCode(code) {
    return parseInt(code.join(''), this.radix);
  }

  // Translate the index of a valid code to the code as an array.
  getCodeFromIndex(index) {
    const unpadded = index.toString(this.radix).split('');
    let i = 0;
    const code = [];
    for (; i < this.length - unpadded.length; ++i) {
      code[i] = 0;
    }
    for (; i < this.length; ++i) {
      code[i] = parseInt(unpadded[unpadded.length - this.length + i]);
    }
    return code;
  }

  getPossibleSecrets(guess, possibleSecrets) {
    const marks = {};

    // Iterate over all possible secrets, filtering marks for those that remain for this game.
    let mark;
    (possibleSecrets ?? this.codes).forEach((secret) => {
      // console.log(guess, code);
      mark = this.getMark(guess, secret).join();
      if (marks[mark]) {
        marks[mark].push(secret);
      } else {
        marks[mark] = [secret];
      }
    });
    return marks;
  }

  // Get the solution tree for the remaining possible secrets.
  getSolutionTree(possible, firstGuess = false) {
    // Get the best guess for the current remaining possible secrets.
    const guess = firstGuess
      ? this.codes[this.getIndexFromCode(firstGuess)]
      : this.getBestGuess(possible);

    // Get the possible secrets for each mark.
    const markDetails = this.getPossibleSecrets(guess, possible);

    const marks = Object.keys(markDetails);
    if (marks.length === 1 && marks[0] === this.solvedMarkKey) {
      return { guess, isSolution: true };
    }

    const branch = { guess, marks: {} };
    marks.sort().forEach((mark) => {
      branch.marks[mark] = this.getSolutionTree(markDetails[mark]);
    });

    return branch;
  }

  getValuesCount(code) {
    const counts = [];
    code.forEach((value) => {
      counts[value] = counts[value] ? counts[value] + 1 : 1;
    });
    return counts;
  }

  buildSolutionTree(firstGuess) {
    this.tree = this.getSolutionTree(this.codes, firstGuess);
    return this;
  }

  markIsSolved(mark) {
    return mark.join() === this.solvedMarkKey;
  }

  play(secret) {
    let node = this.tree;
    const rounds = [];
    while (node) {
      const { guess } = node;
      const mark = this.getMark(guess, secret);
      rounds.push({ guess, mark });
      node = this.markIsSolved(mark) ? null : node.marks[mark];
    }
    return rounds;
  }
}
