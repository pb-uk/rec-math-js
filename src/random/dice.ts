// src/random/dice.ts

/**
 * Roll random dice.
 *
 * @param sides Number of sides per die.
 * @return A random value.
 */
export const roll = (sides = 6) => {
  return Math.floor(Math.random() * sides) + 1;
};
