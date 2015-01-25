var gulp       = require('gulp'),
    watch      = require('../util/watch'),
    config     = require('../config'),
    gulpStart  = require('../util/gulpstart')
    livereload = require('gulp-livereload');

gulp.task('watch', ['watchify'], function () {
  livereload();
  watch({
    root: config.watch.src,
    match: [{
      when: 'js/**',
      then: gulpStart('js')
    }, {
      when: 'sass/**/*.+(sass|scss)',
      then: gulpStart('sass')
    }, {
      when: 'symbols/*.+(svg)',
      then: gulpStart('symbols')
    }, {
      when: 'images/**/*.+(png|jpg|svg|gif)',
      then: gulpStart('images')
    }, {
      when: 'sprites/**/*.+(png)',
      then: gulpStart('sprites')
    }]
  });
});