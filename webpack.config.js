const path = require('path');

const SRC_DIR = path.join(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  favicon: `${DIST_DIR}/favicon.ico`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(DIST_DIR),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        use: 'babel-loader',
      },
    ],
  },
};
