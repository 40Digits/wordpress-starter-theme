var gulp       = require('gulp'),
    config     = require('../config').php,
    util       = require('gulp-util'),
    livereload = require('gulp-livereload');

gulp.task('php', function(){
  server = livereload();
  gulp.watch(config.src).on('change', function(file) {
        util.log(util.colors.yellow('PHP file changed' + ' (' + file.path + ')'));
        server.changed(file.path);
    });
});