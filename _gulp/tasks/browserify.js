/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.

   See browserify.bundleConfigs in gulp/config.js
*/

var gulp            = require('gulp');
var browserify      = require('browserify');
var source          = require('vinyl-source-stream');
var watchify        = require('watchify');
var bundleLogger    = require('../util/bundleLogger');
var handleErrors    = require('../util/handleErrors');
var config          = require('../config').browserify;


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
        file = config._source.scripts + file;
        toRequire[file] = file;
      });
    });

    // Define what the updated bundle entry is.
    bundleConfig.entries = [bundleConfig.mainJS].concat(Object.keys(toRequire));

    //console.log(bundleConfig.entries);

    var bundler = browserify({
      // Required watchify args
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
        .on('end', reportFinished);
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
