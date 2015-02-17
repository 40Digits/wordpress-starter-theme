var changed    = require('gulp-changed'),
    gulp       = require('gulp'),
    imagemin   = require('gulp-imagemin'),
    config     = require('../config').images,
    livereload = require('gulp-livereload');

function imagesDef(livereload){
	return function() {
	  var gulpTown = gulp.src(config.src)
	    .pipe(changed(config.dest))
	    .pipe(imagemin())
	    .pipe(gulp.dest(config.dest));
	    
	    if(livereload)
	    	gulpTown.pipe(livereload());

	    return gulpTown;
	}
}
gulp.task('images', imagesDef(true));
gulp.task('images_dist', imagesDef(false));
