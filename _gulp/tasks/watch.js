/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp        = require('gulp'),
    config      = require('../config'),
    watchify    = require('./browserify'),
    livereload  = require('gulp-livereload');


// Watchify will watch and recompile our JS, so no need to gulp.watch it
// gulp.task('watch', ['watchify','browserSync'], function(callback) {
gulp.task('watch', function(callback) {
  var server = livereload();
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.sprite.src, ['sprites']);
});
