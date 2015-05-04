// Paths
var assetsDir = './assets',
	sourceDir = './_src',
	appDir    = './';

// Source Directory
var _source = {
	root:     sourceDir,
	images:   sourceDir + '/images/**/*',
	scripts:  sourceDir + '/js/',
	sprites:  sourceDir + '/sprites/*.png',
	styles:   sourceDir + '/sass/**/*.{sass,scss}',
	symbols:  sourceDir + '/symbols/*.svg',
	tpl:      sourceDir + '/symbols/tpl/',
	static:   sourceDir + '/static/',
	php:      appDir + '**/*.php'
};

// Assets Directory
var _assets = {
	root:     assetsDir,
	images:   assetsDir + '/images/',
	scripts:  assetsDir + '/js/',
	sprites:  assetsDir + '/images/sprites/',
	styles:   assetsDir + '/css/',
	symbols:  assetsDir + '/fonts/symbols/',
	static:   appDir
}

// Gulp options/settings for tasks.
module.exports = {
	browserify: {
		debug: false,
		src: _source.scripts,
		bundleConfigs: [{
			entries: [],
			dest: _assets.scripts,
			outputName: 'main.js',
			sourceJS: _source.scripts + 'main.js',
			configJS: _source.scripts + 'config/configMain.js'
		}]
	},
	sass: {
		src: _source.styles,
		dest: appDir,
		settings: {
			indentedSyntax: true,
			errLogToConsole: true,
			style: 'nested'
		},
		globbing: {
			extensions: ['.scss', '.sass']
		}
	},
	autoprefixer: {
		browsers: [
			'last 2 versions',
			'safari 5',
			'ie 8',
			'ie 9',
			'android 4'
		],
		cascade: true
	},
	sprites: {
		src: _source.sprites,
		destSprites: _assets.sprites,
		destSass: _source.root + '/sass/helpers',
		settings: {
			retina: true,
			style: '_sprites.scss',
			cssPath: _assets.sprites,
			processor: 'scss',
			orientation: 'binary-tree',
			prefix: 'sprite'
		}
	},
	symbols: {
		src: _source.symbols,
		tplCss: _source.tpl + 'symbols.tpl.css',
		tplSass: _source.tpl + 'symbols.tpl.scss',
		tplHtml: _source.tpl + 'symbols.tpl.html',
		destFont: _assets.symbols,
		destSass: _source.root + '/sass/helpers',
		settings: {
			fontName: 'symbols',
			appendCodepoints: false,
			centerHorizontally: true,
			normalize: true,
			fontHeight: false
		},
		renameSass: {
			basename: '_symbols',
			extname: '.scss'
		}
	},
	static: {
		src: _source.static,
		dest: _assets.static,
		extension: ".html",
		settings: {
			prefix: '@@',
      basepath: '/'
		},
	},
	images: {
		src: _source.images,
		dest: _assets.images,
		settings: {
			progressive: true,
			optimizationLevel: 4
		}
	},
	php: {
		src: _source.php
	},
	watch: {
		src: _source.root,
		dest: _assets.root,
	},
	production: {
		cssSrc: appDir + '*.css',
		cssDest: appDir,
		jsSrc: _assets.scripts + '*.js',
		jsDest: _assets.scripts
	}
};
