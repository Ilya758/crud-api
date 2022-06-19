const path = require('path');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
};

module.exports = {
  context: PATHS.src,
  mode: 'production',
  entry: {
    main: './index.ts',
  },
  output: {
    filename: `[name].cjs`,
    path: PATHS.dist,
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  module: {
    rules: [
      {
        test: /.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
