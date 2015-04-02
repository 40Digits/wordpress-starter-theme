var gulp   = require('gulp'),
	config = require('../config').production,
	size   = require('gulp-filesize'),
	uglify = require('gulp-uglify');

gulp.task('uglifyJs', ['browserify'], function() {
	return gulp.src(config.jsSrc)
		.pipe(uglify())
		.pipe(gulp.dest(config.jsDest))
		.pipe(size());
});
