var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    gulpFilter   = require('gulp-filter'),
    handleErrors = require('../util/handleErrors'),
    config       = require('../config'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload   = require('gulp-livereload');

function sassDef(livereload){
    return function() {
      var gulpy = gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass.settings))
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.sass.dest));

        if(livereload)
            gulpy.pipe(livereload());

        return gulpy;
    }
}
gulp.task('sass', sassDef(true));
gulp.task('sass_dist', sassDef(false));
