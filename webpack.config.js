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
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
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
        test: /\.jsx?/,
        include: SRC_DIR,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|less|css)$/,
        include: SRC_DIR,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }],
      },
      {
        test: /\.(jpe?g|JPG|png|gif|mp3|svg|ttf|woff2|woff|eot)(\?[a-z0-9=.]+)?$/gi,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'url-loader?name=[name].[ext]',
      },
    ],
  },
};

module.exports = [client];
