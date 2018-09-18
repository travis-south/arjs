const path = require('path');

module.exports = {
  watchOptions: {
    poll: true
  },
  entry: [
    'babel-polyfill',
    './src/components/Index.js'
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
