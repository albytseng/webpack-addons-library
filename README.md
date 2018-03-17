# webpack-addons-library

[![Build Status](https://img.shields.io/travis/albytseng/webpack-addons-library.svg)](https://travis-ci.org/albytseng/webpack-addons-library) [![npm Version](https://img.shields.io/npm/v/webpack-addons-library.svg)](https://www.npmjs.com/package/webpack-addons-library)

A webpack scaffold for bundling JavaScript libraries into a single file that can be accessed as any of the following:
- __ES2015 module__
  - `import somePackage from 'some-package'`
- __CommonJS module__
  - `require('some-package')`
- __global variable__
  - included through the `script` tag

## Installation

Install using yarn:

```bash
$ yarn add -D webpack-addons-library
```

Install using npm:

```bash
$ npm i -D webpack-addons-library
```

## Usage

Begin by running:

```bash
$ webpack-cli init webpack-addons-library
```

Three questions will be presented to you:

1) __What is the entry point of your library?__ Default: `src/index.js`.

2) __What is the output filename?__ Default: The package name as listed in `package.json`. Regardless of the filename, the exposed `libraryName` will be the uncapitalized camelcase form of the package name (e.g. the library name of `some-amazing-package` will be `someAmazingPackage`).

3) __Use which mode's config as the default webpack config?__ Default: `dev`. Selecting `dev` would create `webpack.config.js` with development-mode options, and would be the default config used by webpack when you run `yarn webpack`. Additionally, `webpack.prod.config.js` is created with production-mode options (usable as `yarn webpack --config webpack.prod.config.js`).
