module.exports = function (grunt) {

  grunt.config( 'eslint', {
    options: {
      eslintrc: '.eslintrc'
    },
    target: [
      'library/**/*.js',
      '!library/**/config/**/*.js',
      '!library/**/js_test/**/*.js',
      '!library/**/vendor/**/*.js',
      '!library/**/libs/**/*.js'
    ]
  });

  // grunt.loadNpmTasks( 'grunt-contrib-jshint' );
};