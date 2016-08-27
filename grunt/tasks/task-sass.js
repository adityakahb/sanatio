module.exports = function (grunt) {

  grunt.config( 'sass', {
    options: {
      sourceMap: false
    },
    dev: {
      files: [{
        expand: true,
        cwd: 'demos/library/sass',
        src: ['**/**/**/**.scss'],
        dest: 'demos/library/css',
        ext: '.css'
      }]
    }
  });
    
  // grunt.loadNpmTasks( 'grunt-contrib-sass' );
};