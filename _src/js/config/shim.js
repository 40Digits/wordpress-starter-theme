/*

Browserify Shim: https://www.npmjs.com/package/browserify-shim

The core features of browserify-shim are:

	• Shims non-CommonJS modules in order for them to be browserified by specifying an alias, the path to the file, and the identifier under which the module attaches itself to the global window object.
	• Includes depends for shimming libraries that depend on other libraries being in the global namespace.
	• applies shims configured inside the dependencies of your package

Additionally, it handles the following real-world edge cases:

	• Modules that just declare a var foo = ... on the script level and assume it gets attached to the window object. Since the only way they will ever be run is in the global context — "ahem, … NO?!"
	• Makes define and also module be undefined, in order to fix improperly-authored libraries that need shimming but try anyway to use AMD or CommonJS. For more info read the comment inside this fixture
	• removes invalid requires, i.e. require('jquery') although 'jquery' isn't installed due to the library being improperly published or installed incorrectly via a downloader like bower


Info on usage can be found here: https://www.npmjs.com/package/browserify-shim#shimjs

*/
module.exports = {
	// getting jquery from the CDN version which exposes '$' globally
	// now use require('jquery') in your modules
	'jquery': { 'exports': 'global:$' }

	// sample plugin that needs to be shim'd
	// '../lib/jquery.superOld.js': { 'depends': { 'jquery': null } }
}