const path = require('path');
const Dotenv = require('dotenv-webpack');

const SRC_DIR = path.join(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  plugins: [new Dotenv()],
  devServer: {
    host: 'localhost',
    watchContentBase: true,
    conentBase: 'server',
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        use: 'babel-loader',
      },
      {
        test: /\.(sass|less|css)$/,
        include: SRC_DIR,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
};
