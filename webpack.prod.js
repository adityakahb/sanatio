const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: './src/Sanatio.ts',
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
  output: {
    filename: 'sanatio.min.js',
    path: path.resolve(__dirname, 'webpack')
  },
  plugins: [
    new ProgressBarPlugin(),
    /* new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), */
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      sourceMap: false,
      uglifyOptions: {
        compress: true,
        mangle: true
      }
    })
  ]
};