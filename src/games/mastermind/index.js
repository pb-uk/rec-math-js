// src/index.js

import { version } from '../../../package.json';
import { Solver } from './solver';

import * as knuth from './strategy/knuth';

const strategies = {
  knuth,
};

export { version };

export function solverFactory(options = {}) {
  const solver = new Solver(options);

  let { strategy } = options;
  if (strategy && strategies[strategy]) {
    Object.assign(solver, strategies[strategy]);
  }

  return solver;
}
