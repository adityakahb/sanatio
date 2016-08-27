module.exports = function (grunt) {
  grunt.config('clean', {
    options: {
      force: true
    },
    css: [
      'library/**/css',
      'library/sass/**/*.css',
      'library/sass/**/*.map'
    ]
  });

  // grunt.loadNpmTasks( 'grunt-contrib-clean' );
};