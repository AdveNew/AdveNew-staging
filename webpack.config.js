const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const SRC_DIR = path.join(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');
const PORT = process.env.PORT || 3000;

const client = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
      filename: '[file].map',
    }),
  ],
  devServer: {
    host: 'localhost',
    watchContentBase: true,
    conentBase: 'server',
    port: PORT,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      globalize$: path.resolve(__dirname, 'node_modules/globalize/dist/globalize.js'),
      globalize: path.resolve(__dirname, 'node_modules/globalize/dist/globalize'),
      cldr$: path.resolve(__dirname, 'node_modules/cldrjs/dist/cldr.js'),
      cldr: path.resolve(__dirname, 'node_modules/cldrjs/dist/cldr'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js$|jsx)?/,
        include: SRC_DIR,
        enforce: 'pre',
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|less|css)$/,
        include: SRC_DIR,
        use: ['style-loader!css-loader', 'less-loader'],
      },
      {
        test: /\.(jpe?g|JPG|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
};

module.exports = [client];
