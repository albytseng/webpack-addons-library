# webpack-addons-library

[![Build Status](https://img.shields.io/travis/albytseng/webpack-addons-library.svg)](https://travis-ci.org/albytseng/webpack-addons-library)

A webpack scaffold for bundling JavaScript libraries and exposing them as the following:
- __ES2016 module__ - `import somePackage from 'some-package'`
- __CommonJS module__ - `require('some-package')`
- __global variable__ - included through the `script` tag

## Usage

```bash
$ webpack-cli init webpack-addons-library
```
