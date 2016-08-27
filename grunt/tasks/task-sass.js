module.exports = function (grunt) {

  grunt.config( 'sass', {
    options: {
      sourceMap: false
    },
    dev: {
      files: [{
        expand: true,
        cwd: 'library/sass',
        src: ['**/**/**.scss'],
        dest: 'library/css',
        ext: '.css'
      }]
    }
  });
    
  // grunt.loadNpmTasks( 'grunt-contrib-sass' );
};