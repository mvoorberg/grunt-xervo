/*
 * grunt-xervo-deploy
 * https://github.com/digitaljohn/grunt-modulus-deploy
 *
 * Copyright (c) 2014 DigitalJohn
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function( grunt ) {

	grunt.initConfig( {
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},
		/* Create a deployable zip file for the project. */
		compress: {
			build: {
				options: {
					archive: '../grunt-xervo-build.tar.gz',
					mode: 'tgz'
				},
				files: [ {
					cwd: "../grunt-xervo-build",
					src: '**',
					dest: 'package/'
				} ]
			}
		},
		/* Copy all the files from our source folder, to a working copy eventually for deployment */
		copy: {
			build: {
				files: [ {
					/* Copy (almost) everything to the 'dest' folder */
					cwd: '.',
					src: [ '**',
						'!node_modules/**',
						'!Gruntfile.js'
					],
					dest: '../grunt-xervo-build',
					expand: true
				}]
			}
		},
		clean: {
			buildzip: {
				options: {
					force: true
				},
				src: [ '../grunt-xervo-build.tar.gz' ] /* Delete the following file */
			},
			build: {
				options: {
					force: true
				},
				src: [ '../grunt-xervo-build' ] /* Delete the following folder */
			},
		}


	} );

	// Actually load this plugin's task(s).
	grunt.loadTasks( 'tasks' );

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );

	// By default, lint and run all tests.
	grunt.registerTask( 'default', [ 'jshint' ] );

    grunt.registerTask(
		'build',
		'Compiles all of the assets and copies the files to the build directory.',
		[ 'clean:buildzip', 'clean:build', 'copy:build', 'compress:build' ]
	);

};
