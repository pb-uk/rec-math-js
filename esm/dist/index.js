/*! rec-math v0.1.0-dev 2021-10-29 01:47:37
 *  https://github.com/pbuk-uk/rec-math-js
 *  Copyright pbuk (http://github.com/pbuk-uk) MIT license.
 */

// src/random/dice.ts
/**
 * Roll random dice.
 *
 * @param sides Number of sides per die.
 * @return A random value.
 */
const roll = (sides) => {
    if (typeof sides !== 'number') {
        throw new TypeError('Sides must be a number');
    }
    if (!Number.isSafeInteger(sides) || sides < 1) {
        throw new RangeError('Sides must be a strictly positive safe integer');
    }
    return Math.floor(Math.random() * sides) + 1;
};

var dice = /*#__PURE__*/Object.freeze({
    __proto__: null,
    roll: roll
});

// src/random/random.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkValue = (value) => {
    if (typeof value !== 'number') {
        throw new TypeError('Random value must be a number');
    }
    else if (!(value >= 0 && value < 1)) {
        throw new RangeError('Random value must be in the range [0, 1)');
    }
};
/**
 * A constant 'psuedo-random' number generator.
 *
 * @param value The value to return: must be in the range [0, 1).
 * @return A function returning the provided number.
 */
function constant(value = 0) {
    checkValue(value);
    return () => value;
}
/**
 * The default psuedo-random number generator.
 *
 * @return A function returning a psuedo-random number in the range [0, 1).
 */
function math() {
    return Math.random;
}

var random = /*#__PURE__*/Object.freeze({
    __proto__: null,
    constant: constant,
    math: math
});

var version = "0.1.0-dev";

export { dice, random, version };
//# sourceMappingURL=index.js.map
