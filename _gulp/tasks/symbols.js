var gulp        = require('gulp'),
		config      = require('../config').symbols,
		iconfont    = require('gulp-iconfont'),
		consolidate = require('gulp-consolidate'),
		rename      = require('gulp-rename'),
		livereload  = require('gulp-livereload');

gulp.task('symbols', function () {
	return gulp.src(config.src)
		.pipe(iconfont(config.settings))
		.on('codepoints', function(codepoints, options) {
			// Options for when the scss/sass files are being generated.
			var optionsSass = {
				glyphs: codepoints,
				fontName: 'symbols',
				fontPath: 'assets/fonts/symbols/',
				className: 'symbol'
			};
			// Options for when the preview files are being generated.
			var optionsHtml = {
				glyphs: codepoints,
				fontName: 'symbols',
				fontPath: '',
				className: 'symbol'
			};
			// Generate sass/scss file for symbols
			gulp.src(config.tplSass)
				.pipe(consolidate('lodash', optionsSass))
				.pipe(rename(config.renameSass))
				.pipe(gulp.dest(config.destSass));
			// Generate HTML file for symbol preview
			gulp.src(config.tplHtml)
				.pipe(consolidate('lodash', optionsHtml))
				.pipe(rename({ basename:'symbols' }))
				.pipe(gulp.dest(config.destFont));
			// Generate css file for HTML preview
			gulp.src(config.tplCss)
				.pipe(consolidate('lodash', optionsHtml))
				.pipe(rename({ basename:'symbols' }))
				.pipe(gulp.dest(config.destFont));
		})
		.pipe(gulp.dest(config.destFont))
		.pipe(livereload());
});
