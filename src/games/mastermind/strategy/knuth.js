import { objectMax } from '../helpers';

// Get the best guess for a set of possible secrets.
export function getBestGuess(possible) {
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
      bestGuessIsASolution = (marks[this.solvedMarkKey] ?? false) && true;
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
