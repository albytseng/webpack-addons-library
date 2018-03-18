const Generator = require('yeoman-generator');
const {Input, List, createRequire} = require('webpack-addons');
const makeCommonConfig = require('./make-common-config');
const devConfig = require('./dev-config');
const prodConfig = require('./prod-config');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {webpackOptions: {}},
      prod: {webpackOptions: {}},
    };
  }

  prompting() {
    return this.prompt([
      Input('entry', '(1/5) What is the entry point of your library? (src/index.js)'),
      Input('output', '(2/5) What is the output filename? (dist/<package-name>.js)'),
      Input('libraryName', '(3/5) What is the exposed name of your library? (camelCase <package-name>)'),
      List('libraryExport', '(4/5) Given your entry point\'s return <value>, what do you want to export?', [
        '<value>',
        '<value>.default',
      ]),
      List('defaultMode', '(5/5) Use which mode\'s config as the default webpack config?', [
        'dev',
        'prod',
        'no default',
      ]),
    ]).then(answer => {
      const configuration = this.options.env.configuration;

      switch (answer.defaultMode) {
        case 'no default':
          configuration.prod.configName = 'prod.config';
          configuration.dev.configName = 'dev.config';
          break;
        case 'prod':
          configuration.dev.configName = 'dev.config';
          break;
        case 'dev':
        default:
          configuration.prod.configName = 'prod.config';
      }

      const commonConfig = makeCommonConfig(answer);
      configuration.dev.webpackOptions = {...commonConfig, ...devConfig};
      configuration.prod.webpackOptions = {...commonConfig, ...prodConfig};

      const topScope = [
        createRequire('path'),
        `const pkg = require('./package.json');`,
        `const camelCase = require('lodash.camelcase')`,
        `\n`,
      ];
      configuration.dev.topScope = topScope;
      configuration.prod.topScope = topScope;
    });
  }

  writing() {
    this.config.set('configuration', this.options.env.configuration);
  }
};
