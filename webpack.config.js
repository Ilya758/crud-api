const path = require('path');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  outputJS: './js/',
  outputCSS: './css/',
};

module.exports = {
  context: PATHS.src,
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.ts'],
  },
  output: {
    filename: `${PATHS.outputJS}[name].js`,
    path: PATHS.dist,
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {},
  },
  devServer: {
    port: 8081,
    static: PATHS.src,
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
    },
  },
  plugins: [],
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
