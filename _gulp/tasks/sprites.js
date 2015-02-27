var gulp       = require('gulp'),
		config     = require('../config').sprites,
		sprite     = require('css-sprite').stream,
		gulpif     = require('gulp-if'),
		livereload = require('gulp-livereload');

gulp.task('sprites', function() {
	return gulp.src(config.src)
		.pipe(sprite(config.settings))
		.pipe(gulpif('*.png', gulp.dest(config.destSprites)))
		.pipe(gulpif('*.sass', gulp.dest(config.destSass)))
		.pipe(gulpif('*.scss', gulp.dest(config.destSass)))
		.pipe(livereload());
});