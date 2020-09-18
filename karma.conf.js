var webpackConfig = require('./webpack.test.js');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: ['__tests__/SanatioConstants.spec.ts'],
    preprocessors: {
      'src/**/*.ts': ['webpack', 'sourcemap', 'karma-typescript'],
      '__tests__/**/*.ts': ['webpack', 'sourcemap']
    },
    mime: { 'text/x-typescript': ['ts','tsx'] },
    webpack: webpackConfig,
    reporters: ['karma-typescript', 'progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      exclude: ['stories/**/*.tsx'],		
      coverageOptions: {
        exclude: /\.(d|spec|test)\.tsx?/,
      },
      reports: {
        'html': 'coverage',
        'text-summary': '',
      },
    },
    plugins: [
      'karma-jasmine',
      'karma-typescript',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-jasmine-html-reporter'
    ]
  })
}