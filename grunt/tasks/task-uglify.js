module.exports = function (grunt) {

  grunt.config( 'uglify', {
    sanatioWithMap: {
      options: {
        sourceMap: true
      },
      files: {
        'dist/sanatio_with_map.min.js': ['dev/sanatio.js'],
      }
    },
    sanatioWithoutMap: {
      options: {
        sourceMap: false
      },
      files: {
        'dist/sanatio.min.js': ['dev/sanatio.js'],
      }
    }  
  });
    
  // grunt.loadNpmTasks( 'grunt-contrib-sass' );
};