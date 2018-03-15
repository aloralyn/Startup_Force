const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/dev');
const DIST_DIR = path.join(__dirname, '/client/dist');

console.log('source dir: ', SRC_DIR);
console.log('dist dir: ', DIST_DIR);

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          SRC_DIR,
        ],
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};
