# forty gulp starter aka Eta

Eta-2 Actis-class interceptor, sometimes referred to as the Jedi interceptor due to its popularity with Jedi pilots, was a Clone Wars-era Republic starfighter.

For 40Digits, Eta serves as our build script for internal projects. The build script took much inspiration from [graypants'](https://github.com/greypants/gulp-starter) [Chris Davies'](https://github.com/chrisdavies/gulp_starter_kit) starter kits. It was modified to work within the needs and requirements of 40Digits development.

Eta includes the following tools, tasks, and workflows:

- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [SASS](http://sass-lang.com/) (libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer), and [combine media-queries](https://www.npmjs.com/package/gulp-combine-mq))
- [Image optimization](https://www.npmjs.com/package/gulp-imagemin)
- [Sprite generation](https://www.npmjs.com/package/css-sprite)
- [Custom Icon Font generation](https://www.npmjs.com/package/gulp-iconfont)
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)
- Compression task for production builds (CSS + JS)

### Requirements

- [Cairo](https://github.com/Automattic/node-canvas/wiki/installation---osx)
- [Canvas](https://github.com/Automattic/node-canvas/wiki/installation---osx)

### Install
```
npm install
```
This runs through all dependencies listed in `package.json` and downloads them to a `node_modules` folder in your project directory. See [troubleshooting](https://github.com/40Digits/eta#troubleshooting) section if you run into errors.

### gulp

```
gulp
```

This will run the `default` gulp task defined in `_gulp/tasks/default.js`, which has the following task dependencies: `['symbols', 'sass', 'images', 'sprites', 'browserify', 'watch']`
- `symbols` task generates your icon font, preview file, and sass file.
- `sass` task compiles your sass files.
- `images` moves image copies from a source folder, performs optimizations, then outputs them into the assets folder.
- `sprites` task compiles sprite assets into a sprite sheet, and generates a sass file for mixins & variable use.
- `watch` tasks looks out for changes, and when a file is added, removes, or edited, it runs necessary task.

#### gulp production

There is also a `production` task you can run with `gulp production`, which will re-build optimized, compressed css and js files to the assets folder, as well as output their file sizes to the console. It's a shortcut for running the following tasks: `['minifyCss', 'uglifyJs']`.


### Configuration
All paths and task settings have been abstracted into a centralized config object in `_gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.


### Troubleshooting
If you are running into canvas errors, please review the [installation guide](https://github.com/Automattic/node-canvas/wiki/installation---osx) for canvas. 

If you are receiving `Package xcb-shm was not found`, please run the following commands:
- If you are using Fish `set -xU PKG_CONFIG_PATH /usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig`
- If you are using s/iTerm/general sh `export PKG_CONFIG_PATH /usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig:$PKG_CONFIG_PATH` or `export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig`

For additional install help, [view the installation guide](https://github.com/Automattic/node-canvas/wiki/installation---osx).
