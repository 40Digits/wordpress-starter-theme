var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    gulpFilter   = require('gulp-filter'),
    handleErrors = require('../util/handleErrors'),
    config       = require('../config'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload   = require('gulp-livereload');

gulp.task('sass', function () {
  return gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass.settings))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(livereload());
});

//.pipe(autoprefixer(config.autoprefixer))
