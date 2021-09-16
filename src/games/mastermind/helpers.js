// src/helpers.js

const { max } = Math;

export function objectMax(obj) {
  return Object.values(obj).reduce((m, value) => max(m ?? value, value), null);
}
