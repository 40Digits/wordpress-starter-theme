var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		sourcemaps   = require('gulp-sourcemaps'),
		gulpFilter   = require('gulp-filter'),
		handleErrors = require('../util/handleErrors'),
		config       = require('../config'),
		autoprefixer = require('gulp-autoprefixer'),
		livereload   = require('gulp-livereload'),
	    globbing     = require('gulp-css-globbing');

gulp.task('sass', function () {
	return gulp.src(config.sass.src)
		.pipe(sourcemaps.init())
		.pipe(globbing({
	        extensions: ['.scss', '.sass']
	    }))
		.pipe(sass(config.sass.settings))
		.on('error', handleErrors)
		.pipe(sourcemaps.write())
		.pipe(autoprefixer(config.autoprefixer))
		.pipe(gulp.dest(config.sass.dest))
		.pipe(livereload());
});
