var changed    = require('gulp-changed'),
		gulp       = require('gulp'),
		imagemin   = require('gulp-imagemin'),
		config     = require('../config').images,
		livereload = require('gulp-livereload');

gulp.task('images', function() {
	return gulp.src(config.src)
		.pipe(changed(config.dest))
		.pipe(imagemin())
		.pipe(gulp.dest(config.dest))
		.pipe(livereload());
});
