(function () {
	'use strict';

	var gulp 			= require('gulp'),
		plugins 		= require('gulp-load-plugins')(),
		sass 			= require('gulp-ruby-sass'),
		paths			= {
			styles: '**/*.scss'
		};

	// CSS
	gulp.task('css', function() {
		return gulp.src(paths.styles)
			.pipe(sass({
					style: 'nested',
					lineNumber: true,
					require: 'sass-globbing'
				})
			)
			.on("error", handleError)
			.pipe(gulp.dest(''))
			// .pipe(plugins.minifyCss())
			// .pipe(gulp.dest(''));
	});

	// Error Handling
	function handleError(err) {
		console.log(err.toString());
		this.emit('end');
	}

	// Default Task
	gulp.task('default', function() {
		gulp.start('css');
	});

	// Watch
	gulp.task('watch', function() {
		gulp.watch(paths.styles, ['css']);
	});

}());