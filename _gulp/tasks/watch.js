var gulp       = require('gulp'),
		watch      = require('../util/watch'),
		config     = require('../config'),
		gulpStart  = require('../util/gulpstart'),
		livereload = require('gulp-livereload');

gulp.task('watch', ['php'], function () {
	livereload({ start: true });
	watch({
		root: config.watch.src,
		match: [{
			when: 'js/**/*.+(js|ejs)',
			then: gulpStart('browserify')
		}, {
			when: 'sass/**/*.+(sass|scss)',
			then: gulpStart('sass')
		}, {
			when: 'symbols/*.+(svg)',
			then: gulpStart('symbols')
		}, {
			when: 'images/**/*.+(png|jpg|jpeg|svg|gif)',
			then: gulpStart('images')
		}, {
			when: 'sprites/**/*.+(png)',
			then: gulpStart('sprites')
		}, {
			when: 'static/**/*.+(html)',
			then: gulpStart('static')
		}]
	});
});