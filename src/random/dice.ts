// src/random/dice.ts

/**
 * Roll random dice.
 *
 * @param sides Number of sides per die.
 * @return A random value.
 */
export const roll = (sides: number) => {
  if (typeof sides !== 'number') {
    throw new TypeError('Sides must be a number');
  }
  if (!Number.isSafeInteger(sides) || sides < 1) {
    throw new RangeError('Sides must be a strictly positive safe integer');
  }
  return Math.floor(Math.random() * sides) + 1;
};
