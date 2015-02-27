var gulp      = require('gulp'),
		config    = require('../config').production,
		minifyCSS = require('gulp-minify-css'),
		size      = require('gulp-filesize'),
		combineMQ = require('gulp-combine-mq');

gulp.task('minifyCss', ['sass'], function() {
	return gulp.src(config.cssSrc)
		.pipe(combineMQ())
		.pipe(minifyCSS({advanced:false}))
		.pipe(gulp.dest(config.cssDest))
		.pipe(size());
})
