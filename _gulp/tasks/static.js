var changed     = require('gulp-changed'),
		gulp        = require('gulp'),
		fileinclude = require('gulp-file-include'),
		rename      = require('gulp-rename'),
		config      = require('../config').static,
		path        = require('path'),
		livereload  = require('gulp-livereload');

gulp.task('static', function() {
	return gulp.src(path.join(config.src, '*.tpl.html'))
		.pipe(fileinclude())
		.pipe(rename({ extname: "" }))
		.pipe(rename({ extname: config.extension }))
		.pipe(gulp.dest(config.dest))
		.pipe(livereload());
});