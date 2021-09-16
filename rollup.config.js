// rollup.config.js
import { rmSync } from 'fs';

import camelCase from 'camelcase';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

// Uncomment commonjs and/or resolve here and in plugins if required.
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

// Minimum node.js version for CommonJS build.
const node = '12'; // Until EOL 2022-04-30
// const node = '14'; // Until EOL 2023-04-30
// const node = '16'; // Until EOL 2024-04-30

// Browserslist target for Browser and ES module build.
const targets = '>0.25%, not dead, not IE 11, Firefox ESR';

// Delete existing files.
if (rmSync) {
  rmSync('dist', { recursive: true, force: true });
}

// Human timestamp for banner.
const datetime = new Date().toISOString().substring(0, 19).replace('T', ' ');

const pkgName = pkg.name.replace(/@.*\//, '');

// Main banner.
const banner = `/*! ${pkgName} v${pkg.version} ${datetime}
 *  ${pkg.homepage}
 *  Copyright ${pkg.author} ${pkg.license} license.
 */
`;

// Configure main build.
const main = {
  input: 'src/index.js',
  file: 'index',
  name: camelCase(pkgName, { pascalCase: true }),
  banner,
};

// Modules to build.
const modules = [['games/', 'mastermind', 'index.js']];

// Sub-module banner.
const getBanner = ({ file, name }) => `/*! ${pkgName}/${file} v${
  pkg.version
} ${datetime}
 *  ${camelCase(pkgName, { pascalCase: true })} ${name} module
 *  ${pkg.homepage}
 *  Copyright ${pkg.author} ${pkg.license} license.
 */
`;

const plugins = [
  // resolve(), // so Rollup can find CommonJS modules.
  // commonjs(), // so Rollup can convert CommonJS to ES modules.
  json(),
];

const getBrowserConfig = ({ input, file, name, banner }) => ({
  // browser-friendly iife build
  input,
  output: [
    {
      banner: banner || getBanner({ file, name }),
      name,
      file: `dist/${file}.min.js`,
      format: 'iife',
      esModule: false,
      sourcemap: true,
    },
  ],
  plugins: [
    ...plugins,

    babel({
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', { targets }]],
      exclude: 'node_modules/**',
    }),

    terser(),
  ],
});

const getEsConfig = ({ input, file, name, banner }) => ({
  // ES module (for bundlers) build.
  input,
  output: [
    {
      banner: banner || getBanner({ file, name }),
      file: `dist/esm/${file}.js`,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    ...plugins,

    babel({
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', { targets }]],
      exclude: 'node_modules/**',
    }),
  ],
});

const getCjsConfig = ({ input, file, name, banner }) => ({
  // CommonJS (for Node) build.
  input,
  output: [
    {
      banner: banner || getBanner({ file, name }),
      file: `dist/cjs/${file}.js`,
      format: 'cjs',
      sourcemap: true,
      esModule: false,
    },
  ],
  plugins: [
    ...plugins,

    babel({
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', { targets: { node } }]],
      exclude: 'node_modules/**',
    }),
  ],
});

const build = [
  getBrowserConfig({ ...main, file: pkgName }),
  getEsConfig(main),
  getCjsConfig(main),
];

modules.forEach(([path, name, file]) => {
  const module = {
    input: `src/${path}${name}/${file}`,
    file: `${path}${name}`,
    name: camelCase(name, { pascalCase: true }),
  };

  build.push(
    getBrowserConfig(module),
    getEsConfig(module),
    getCjsConfig(module)
  );
});

export default build;
