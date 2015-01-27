// Paths
var assetsDir = './assets',
    sourceDir = './_src',
    appDir  = './';

// Source Directory
var _source = {
  root:     sourceDir,
  images:   sourceDir + '/images/**/*',
  scripts:  sourceDir + '/js/',
  sprites:  sourceDir + '/sprites/*.png',
  styles:   sourceDir + '/sass/**/*.{sass,scss}',
  symbols:  sourceDir + '/symbols/*.svg',
  tpl:      sourceDir + '/tpl/'
};

// Assets Directory
var _assets = {
  root:     assetsDir,
  images:   assetsDir + '/images/',
  scripts:  assetsDir + '/js/',
  sprites:  assetsDir + '/images/sprites/',
  styles:   assetsDir + '/css/',
  symbols:  assetsDir + '/fonts/symbols/'
}

// What sort of pre-processor are we utilizing?
var _processor = {
  format: 'scss'
};

// Gulp options/settings for tasks.
module.exports = {
  browserify: {
    debug: true,
    bundleConfigs: [{
      entries: [_source.scripts + 'main.js'],
      dest: _assets.scripts,
      outputName: 'main.js'
    }],
    _source: _source
  },
  sass: {
    src: _source.styles,
    dest: appDir,
    settings: {
      indentedSyntax: false,
      style: 'expanded',
      sourceComments: 'normal'
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
      style: '_sprites.' + _processor.format,
      cssPath: _assets.sprites,
      processor: _processor.format,
      orientation: 'binary-tree',
      prefix: 'sprite'
    }
  },
  symbols: {
    src: _source.symbols,
    tplCss: _source.tpl + 'symbols.tpl.css',
    tplSass: _source.tpl + 'symbols.tpl.' + _processor.format,
    tplHtml: _source.tpl + 'symbols.tpl.html',
    destFont: _assets.symbols,
    destSass: _source.root + '/sass/helpers',
    settings: {
      fontName: 'Symbols',
      appendCodepoints: false,
      centerHorizontally: true,
      normalize: true,
      fontHeight: false
    },
    renameSass: {
      basename: '_symbols',
      extname: '.' + _processor.format
    }
  },
  images: {
    src: _source.images,
    dest: _assets.images
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
