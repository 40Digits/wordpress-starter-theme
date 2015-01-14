var gulp   = require('gulp'),
    config = require('../config').sprite,
    sprite = require('css-sprite').stream,
    gulpif = require('gulp-if');

gulp.task('sprites', function() {
  return gulp.src(config.src)
    .pipe(sprite(config.settings))
    .pipe(gulpif('*.png', gulp.dest(config.dest_img)))
    .pipe(gulpif('*.scss', gulp.dest(config.dest_sass)));
});