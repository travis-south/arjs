const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/renderers/dom.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  }
};
