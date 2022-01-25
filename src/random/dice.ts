// src/random/dice.ts

export type DiceOptions = {
  // Number of dice.
  number?: number;
  // Sides per die.
  sides?: number;
  // Psuedo-random number generator.
  random?: () => number;
  // Length for createIterator.
  iteratorLength?: number;
  // Take top (n).
  top?: number;
  // Ignore top (n).
  ignoreTop?: number;
  // Add constant.
  plus?: number;
};

export type DiceIterator = IterableIterator<DiceRoll>;

// Return type for a dice roll.
export type DiceRoll = {
  value: number;
  values: number[];
};

const diceDefaults = {
  // Number of dice.
  number: 1,
  // Sides per die.
  sides: 6,
  // Psuedo-random number generator.
  random: Math.random,
  // Add constant.
  plus: 0,
};

const checkSides = (sides: number) => {
  if (typeof sides !== 'number') {
    throw new TypeError('Sides must be a number');
  }
  if (!Number.isSafeInteger(sides) || sides < 1) {
    throw new RangeError('Sides must be a strictly positive safe integer');
  }
};

export const create = (options: DiceOptions = {}): (() => DiceRoll) => {
  const settings = { ...diceDefaults, ...options };
  const { number, sides, random, plus, top, ignoreTop } = settings;

  checkSides(sides);

  const values = Array(number);
  const roll = (): DiceRoll => {
    let value = plus;
    for (let i = 0; i < number; ++i) {
      const n = Math.floor(random() * sides) + 1;
      value += values[i] = n;
    }

    // Recalculate value if not all dice counted.
    if (top || ignoreTop) {
      value = plus;
      const sorted = values.slice().sort().reverse();
      const first = ignoreTop ?? 0;
      const afterLast = top == null ? sorted.length : first + top;
      for (let i = first; i < afterLast; ++i) {
        value += sorted[i];
      }
    }

    return { value, values };
  };

  return roll;
};

export const createIterator = (options: DiceOptions = {}): DiceIterator => {
  const roll = create(options);
  const { iteratorLength } = options;
  if (iteratorLength) {
    let i = 0;
    const iterator = {
      next: (): IteratorResult<DiceRoll> => {
        if (i < iteratorLength) {
          ++i;
          return { value: roll(), done: false };
        }
        return { value: undefined, done: true };
      },
      [Symbol.iterator]: (): DiceIterator => iterator,
    };
    return iterator;
  }
  const iterator = {
    next: (): IteratorResult<DiceRoll> => ({ value: roll(), done: false }),
    [Symbol.iterator]: (): DiceIterator => iterator,
  };
  return iterator;
};

/**
 * Roll a random die.
 *
 * @param sides Number of sides per die (default 6).
 * @return A random value.
 */
export const roll = (sides = 6): number => {
  checkSides(sides);
  return Math.floor(Math.random() * sides) + 1;
};
