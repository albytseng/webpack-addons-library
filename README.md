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

```bash
$ webpack-cli init webpack-addons-library
```
