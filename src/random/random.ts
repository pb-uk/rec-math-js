// src/random/random.ts

// xeslint-disable-next-line @typescript-eslint/no-explicit-any
const checkValue = (value: number) => {
  if (typeof value !== 'number') {
    throw new TypeError('Random value must be a number');
  } else if (!(value >= 0 && value < 1)) {
    throw new RangeError('Random value must be in the range [0, 1)');
  }
};

/**
 * A constant 'psuedo-random' number generator.
 *
 * @param value The value to return: must be in the range [0, 1).
 * @return A function returning the provided number.
 */
export function constant(value = 0) {
  checkValue(value);

  return () => value;
}

/**
 * The default psuedo-random number generator.
 *
 * @return A function returning a psuedo-random number in the range [0, 1).
 */
export function math() {
  return Math.random;
}
