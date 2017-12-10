const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  externals: /^aws-sdk($|\/)/,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader'
      }
    ]
  }
};
