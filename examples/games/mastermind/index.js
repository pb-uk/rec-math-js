const { performance } = require('perf_hooks');

// const { solverFactory } = require('mastermind-solver');
const { solverFactory, version } = require('..');

console.log('Show version', version);

// Get a default game (4 holes with 6 colours).
const game = solverFactory();

// getMark(a, b) marks a guess against a secret.
console.log('Four right places', game.getMark([0, 1, 2, 3], [0, 1, 2, 3]));
console.log('Four right colours', game.getMark([0, 1, 2, 3], [1, 2, 3, 0]));

// console.log(game.tree);

// console.log(game.play([0, 0, 1, 1]));
// console.log(game.play([2, 5, 2, 1]));

let time = performance.now();

function elapsed() {
  const elapsed = Math.round(performance.now() - time) / 1000;
  time = performance.now();
  return elapsed;
}

console.log('First guess', game.getBestGuess(game.codes), 'in', elapsed(), 's');

game.buildSolutionTree();
console.log('Build tree in', elapsed(), 's');
console.log('Get stats', game.getStats(), 'in', elapsed(), 's');

const mm54 = solverFactory({ length: 5, radix: 4 }).buildSolutionTree();
console.log('5 holes with 4 colours in', elapsed(), 's', mm54.getStats());

const mm48 = solverFactory({ radix: 8 }).buildSolutionTree();
console.log('4 holes with 8 colours in', elapsed(), 's', mm48.getStats());

// const mm58 = solverFactory({ length: 5, radix: 8 }).buildSolutionTree();
// console.log('5 holes with 8 colours in', elapsed(), 's', mm58.getStats());

const mm58 = solverFactory({ length: 5, radix: 8 }).buildSolutionTree();
console.log('5 holes with 8 colours in', elapsed(), 's', mm58.getStats());

const mm68 = solverFactory({ length: 6, radix: 8 }).buildSolutionTree();
console.log('6 holes with 8 colours in', elapsed(), 's', mm68.getStats());
