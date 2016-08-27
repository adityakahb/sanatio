module.exports = function (grunt) {

  grunt.config( 'uglify', {
    sanatio: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapIn: 'example/coffeescript-sourcemap.js', // input sourcemap from a previous compilation
      },
      files: {
        'dist/sanatio.min.js': ['dev/sanatio.js'],
      }
    }
  });
    
  // grunt.loadNpmTasks( 'grunt-contrib-sass' );
};