const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: './src/Sanatio.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  output: {
    filename: 'sanatio.js',
    path: path.resolve(__dirname, 'webpack')
  },
  plugins: [
    new ProgressBarPlugin()
    /* new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), */
  ]
};