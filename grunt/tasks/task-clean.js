module.exports = function (grunt) {
  grunt.config('clean', {
    options: {
      force: true
    },
    css: [
      'demos/library/**/css',
      'demos/library/sass/**/*.css',
      'demos/library/sass/**/*.map'
    ]
  });

  // grunt.loadNpmTasks( 'grunt-contrib-clean' );
};