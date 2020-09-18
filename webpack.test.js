const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// TODO: Add compression logic

module.exports = {
  entry: './src/Sanatio.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: path.resolve('./src/'),
        enforce: "post",
        exclude: /(node_modules|resources\/js\/vendor)/,
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        include: [
          path.resolve('./src/'),
          path.resolve('./__tests__/')
        ]
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
    path: path.resolve(__dirname, '__tests__')
  },
  plugins: [
    new ProgressBarPlugin()
  ]
};