module.exports = function (answer) {
  const context = `path.resolve(__dirname)`;

  const entryName = answer.entry
    ? `'${answer.entry}'`
    : `'src/index.js'`;
  const entry = `path.resolve(__dirname, ${entryName})`;

  const outputName = answer.output
    ? `'${answer.output}'`
    : '\`dist/${pkg.name}.js\`';

  const output = {
    path: `path.resolve(__dirname)`,
    filename: outputName,
    library: answer.libraryName
      ? `'${answer.libraryName}'`
      : '\`${camelCase(pkg.name)}\`',
    libraryTarget: `'umd'`,

    // HACK: Fix webpack global object incorrectly defaulting to 'window'
    globalObject: `'typeof self !== \\'undefined\\' ? self : this'`,
  };

  if (answer.libraryExport === '<value>.default') {
    output.libraryExport = `'default'`;
  }

  const babelLoaderRule = {
    test: [`/\\.js$/`, `/\\.jsx$/`],
    exclude: `/node_modules/`,
    loader: `'babel-loader'`,
    options: {
      presets: [`['env', {modules: false}]`],
    },
  };


  const baseConfig = {
    context,
    entry,
    output,
    module: {
      rules: [
        babelLoaderRule,
      ],
    },
  };

  if (answer.envTarget === 'web') {
    return baseConfig;
  }

  if (answer.envTarget === 'node') {
    return {
      ...baseConfig,
      externals: [`nodeExternals()`],
      target: `'node'`,
    };
  }
};
