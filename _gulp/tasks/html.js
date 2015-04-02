var gulp       = require('gulp'),
		config     = require('../config').html,
		util       = require('gulp-util'),
		livereload = require('gulp-livereload');

gulp.task('html', function(){
	gulp.watch(config.src).on('change', function(file) {
			util.log(util.colors.yellow('HTML file changed' + ' (' + file.path + ')'));
			livereload.changed(file.path);
	});
});