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

When this utility is run, a short questionnaire guides you through the customization process. Once done, it generates webpack config files in the root directory.

To begin, run:

```bash
$ yarn webpack-cli init webpack-addons-library
```

Or to begin with npx:

```bash
$ npx webpack-cli init webpack-addons-library
```

## Customization

#### 1) What is the entry point of your library?

- *Default:* `src/index.js`

#### 2) What is the output filename?

- *Default:* `dist/<package-name>.js`

  `<package-name>` is the name listed in `package.json`.

#### 3) What is the exposed name of your library?

- *Default:* the uncapitalized camelCase form of `<package-name>`.

  You can think of this as the name that outside code uses to refer to your library.

#### 4) In your entry point's return value, which export do you want to expose?

- `<value>`

  An entry point's return value is the namespace or module returned by that file. For example, if your entry point is this file:

  ```javascript
  // your entry point: index.js
  export const greet = () => console.log('hello world');
  ```

  then `greet` is exposed to users of your library as follows:

  ```javascript
  // user of your library
  require('your-library').greet(); // 'hello world'
  ```

  This means that if you have a default export, it must be referenced explicitly:

  ```javascript
  // your entry point: index.js
  export const greet = () => console.log('hello world');
  export default () => console.log('👋 🌎');
  ```

  ```javascript
  // user of your library
  require('your-library').default(); // '👋 🌎'
  ```

- `<value>.default`

  Selecting this assigns the default export of your library to the point of exposure:

  ```javascript
  // user of your library
  require('your-library')(); // '👋 🌎'
  require('your-library').greet // undefined
  ```

#### 5) Use which mode's config as the default webpack config?

- `dev`

  Selecting `dev` creates `webpack.config.js` with development-mode settings, and would be the default config used by webpack when you run `yarn webpack`.

  Additionally, `webpack.prod.config.js` is created with production-mode settings (usable as `yarn webpack --config webpack.prod.config.js`).

- `prod`

  Creates `webpack.config.js` with production-mode settings and `webpack.dev.config.js` with development-mode settings.

- `no default`

  Creates `webpack.dev.config.js` and `webpack.prod.config.js`.
