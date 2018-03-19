const extPattern = /(\.)[^\.]*$/;
const getNodeOutputName = s => {
  if (extPattern.test(s)) return s.replace(extPattern, '.node.');
  return s + '.node.js';
}

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
    return [baseConfig];
  } else {
    const nodeConfig = {
      externals: [`nodeExternals()`],
      target: `'node'`,
    };

    if (answer.envTarget === 'node') {
      return [{...baseConfig, ...nodeConfig}];
    }

    if (answer.envTarget === 'isomorphic') {
      return [
        baseConfig,
        {
          ...baseConfig,
          ...nodeConfig,
          output: {
            ...baseConfig.output,
            filename: getNodeOutputName(outputName),
          },
        },
      ];
    }
  }
};
