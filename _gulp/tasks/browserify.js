/* browserify task
	 ---------------
	 Bundle javascripty things with browserify!

	 This task is set up to generate multiple separate bundles,
	 from different sources.

	 See browserify.bundleConfigs in gulp/config.js
*/

var gulp            = require('gulp');
var browserify      = require('browserify');
var source          = require('vinyl-source-stream');
var bundleLogger    = require('../util/bundleLogger');
var handleErrors    = require('../util/handleErrors');
var config          = require('../config').browserify;
var fs              = require('fs');
var livereload      = require('gulp-livereload');

var browserifyTask = function(callback, devMode) {

	var bundleQueue = config.bundleConfigs.length;

	var browserifyThis = function(bundleConfig) {

		// Location of the browserify _config.js file
		var _config = '../../' + bundleConfig.configJS;

		// Removed the cached version of the browserify _config.js file
		// If the dev changed this file we want the newest version
		delete require.cache[require.resolve(_config)];

		var toRequire = {},
			// require the browserify _config.js file to get the selectores
			browserifyConfig = require(_config);

		Object.keys(browserifyConfig.selectors).forEach(function (key) {
			browserifyConfig.selectors[key].forEach(function (file) {
				toRequire[file] = " require('" + file + "'); ";
			});
		});

		var content = fs.readFileSync(bundleConfig.sourceJS).toString().split('========')[0];

		content = content + '========' + '\n' + 'return; ';

		Object.keys(toRequire).forEach(function (key) {
			content = content + toRequire[key];
		});

		fs.writeFileSync(bundleConfig.sourceJS, content);

		bundleConfig.entries = [bundleConfig.sourceJS].concat([bundleConfig.sourceJS]);

		var bundler = browserify({
			// Required args
			cache: {}, packageCache: {}, fullPaths: false,
			// Specify the entry point of your app
			entries: bundleConfig.entries,
			// Add file extentions to make optional in your requires
			extensions: config.extensions,
			// Enable source maps!
			debug: config.debug
		});

		var bundle = function() {
			// Log when bundling starts
			bundleLogger.start(bundleConfig.outputName);

			return bundler
				.bundle()
				// Report compile errors
				.on('error', handleErrors)
				// Use vinyl-source-stream to make the
				// stream gulp compatible. Specifiy the
				// desired output filename here.
				.pipe(source(bundleConfig.outputName))
				// Specify the output destination
				.pipe(gulp.dest(bundleConfig.dest))
				.on('end', reportFinished)
				.pipe(livereload());
		};

		var reportFinished = function() {
			// Log when bundling completes
			bundleLogger.end(bundleConfig.outputName)

			if(bundleQueue) {
				bundleQueue--;
				if(bundleQueue === 0) {
					// If queue is empty, tell gulp the task is complete.
					// https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
					callback();
				}
			}
		};

		return bundle();
	};

	// Start bundling with Browserify for each bundleConfig specified
	config.bundleConfigs.forEach(browserifyThis);
};

gulp.task('browserify', browserifyTask);


// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask