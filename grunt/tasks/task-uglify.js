module.exports = function (grunt) {

  grunt.config( 'uglify', {
    sanatio: {
      options: {
        sourceMap: true
      },
      files: {
        'dist/sanatio.min.js': ['dev/sanatio.js'],
      }
    }
  });
    
  // grunt.loadNpmTasks( 'grunt-contrib-sass' );
};