var gulp       = require('gulp'),
    watch      = require('../util/watch'),
    config     = require('../config'),
    gulpStart  = require('../util/gulpstart'),
    livereload = require('gulp-livereload');

gulp.task('watch', function () {
  livereload();
  watch({
    root: config.watch.src,
    match: [{
      when: 'js/**/*.+(js)',
      then: gulpStart('browserify')
    }, {
      when: 'sass/**/*.+(sass|scss)',
      then: gulpStart('sass')
    }, {
      when: 'symbols/*.+(svg)',
      then: gulpStart('symbols')
    }, {
      when: 'images/**/*.+(png|jpg|jpeg|svg|gif)',
      then: gulpStart('images')
    }, {
      when: 'sprites/**/*.+(png)',
      then: gulpStart('sprites')
    }]
  });
});