// .eslintrc.js

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
  overrides: [
    {
      files: ['**/*.{spec,test}.{j,t,cj}s'],
      env: { mocha: true },
      extends: ['plugin:mocha/recommended'],
      plugins: ['mocha'],
      rules: {},
    },
  ],
};
