/*
 * grunt-xervo
 *
 * Borrowed from
 * https://github.com/digitaljohn/grunt-modulus-deploy
 *
 * Copyright (c) 2014 DigitalJohn
 * Licensed under the MIT license.
 */
'use strict';

var exec = require( 'child_process' ).exec;
var xervoPath = 'xervo';

// Maybe different?
// var isWindows = /^win/.test(process.platform);
// if (isWindows) {
// 	xervoPath = 'xervo';
// }

var execOptions = {};

var captureOutput = function( child, output ) {
	child.pipe( output );
};

var runCmd = function( cmd, okString, cb ) {
	var cp = exec( cmd, execOptions, function( err, stdout, stderr ) {
		if ( err ) {
			console.log( err );
			cb( err );
		} else if ( stdout.toLowerCase().indexOf( okString ) === -1 ) {
			cb( "We didn't get the success message, something is wrong." );
		} else {
			cb(); // Success!
		}
	} );

	captureOutput( cp.stdout, process.stdout );
	captureOutput( cp.stderr, process.stderr );
};

module.exports = function( grunt ) {

	grunt.registerMultiTask( 'xervo-deploy', 'Allows deployment to Xervo.io from Grunt.', function() {
		var options = this.options();

		var done = this.async();

		var cmdProject = options.project ? ' -p ' + options.project : '';
		var cmdOpts = options.opts ? ' ' + options.opts : '';
		var cmdDir = options.dir ? ' ' + options.dir : '';

		var deployCmd = xervoPath + ' deploy' + cmdOpts + cmdProject + cmdDir;

		// console.log("*** deployCmd : " + deployCmd);

		runCmd( deployCmd, options.project + ' running at ', function( err ) {
			if ( err ) {
				done( false ); // failed
			} else {
				done( true ); // success
			}
		} );

	} );

};
