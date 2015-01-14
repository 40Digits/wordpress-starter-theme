var dest        = './assets',
    src         = './_src';

var paths = {
      images:   src + '/images/**/*',
      scripts:  src + '/js/**/*.js',
      sprites:  src + '/sprites/*.png',
      styles:   src + '/sass/**/*.{sass,scss}'
    };

module.exports = {
  sass: {
    src: paths.styles,
    // For non Wordpress installs, change dest to
    // dest: dest + '/css',
    dest: './',
    settings: {
      "sourcemap=none": true,
      style: 'nested',
      lineNumber: true,
      require: ['sass-globbing'],
      trace: true
    }
  },
  sprite: {
    src: paths.sprites,
    dest_img: dest + '/images/sprites',
    dest_sass: src + '/sass/helpers',
    settings: {
      name: 'sprite.png',
      retina: true,
      style: '_sprites.scss',
      cssPath: '../images/sprites',
      processor: 'scss',
      prefix: 'sprite'
    }
  },
  images: {
    src: paths.images,
    dest: dest + '/images'
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: paths.scripts,
      dest: dest + '/js',
      outputName: 'main.js',
      require: ['jquery']
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};