module.exports = function (grunt) {

  grunt.config( 'jshint', {
    options: {
      jshintrc: '.jshintrc'
    },
    all: [
      'library/**/*.js',
      '!library/**/config/*.js',
      '!library/**/vendor/**/*.js',
    ]
  });

  // grunt.loadNpmTasks( 'grunt-contrib-jshint' );
};