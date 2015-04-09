var gulp       = require('gulp'),
		config     = require('../config').markup,
		util       = require('gulp-util'),
		livereload = require('gulp-livereload');

gulp.task('markup', function(){
	gulp.watch(config.src).on('change', function(file) {
			util.log(util.colors.yellow('file changed' + ' (' + file.path + ')'));
			livereload.changed(file.path);
	});
});