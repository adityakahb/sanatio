module.exports = function( grunt ) {

    /* Configure */
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        buildRoot: '../',
        revision: 0
    });

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        jitGrunt: true
    });

    /* Load tasks */
    grunt.loadTasks( 'grunt/tasks' );

    /* Task aliases */
    grunt.registerTask( 'default', 'Building...', [
        'clean:css',
        'sass:dev'
    ]);

};
