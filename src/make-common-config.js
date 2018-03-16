module.exports = function (answer) {
  const context = `path.resolve(__dirname)`;

  const entryName = answer.entry
    ? `'${answer.entry}'`
    : `'src/index.js'`;
  const entry = `path.resolve(__dirname, ${entryName})`;

  const output = {
    path: `path.resolve(__dirname)`,
    filename: answer.output
      ? `'${answer.output}'`
      : '\`dist/${pkg.name}.js\`',
    library: '\`${camelCase(pkg.name)}\`',
    libraryTarget: `'umd'`,
    libraryExport: `'default'`,

    // HACK: Fix webpack global object incorrectly defaulting to 'window'
    globalObject: `'typeof self !== \\'undefined\\' ? self : this'`,
  };

  const babelLoaderRule = {
    test: [`/\\.js$/`, `/\\.jsx$/`],
    exclude: `/node_modules/`,
    loader: `'babel-loader'`,
    options: {
      presets: [`['env', {modules: false}]`],
    },
  };

  return {
    context,
    entry,
    output,
    module: {
      rules: [
        babelLoaderRule,
      ],
    },
  };
};
