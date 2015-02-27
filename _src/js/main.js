///////////////////////////////////////////////////////////////////////////
//                                                                       //
//   HELLO DEV. All your custom code should go in its own modules and    //
//   views directories. Configuration (selectors and whatnot) should     //
//   go in the `config/configMain.js` file. Each bundle should have      //
//   their own config file. Check the README or ask someone if you       //
//   have questions. Happy developing!                                   //
//                                                                       //
///////////////////////////////////////////////////////////////////////////

var config = require('./config/configMain'),
	$ = window.jQuery,

	toRequire = [],
	toIgnore = [];

// Shims
// TODO: pull these in via browserify or bower or something

// refresh
$.fn.refresh=function(){var e=$(this.selector);this.splice(0,this.length);this.push.apply(this,e);return this};
// [].forEach shim
if(!Array.prototype.forEach){Array.prototype.forEach=function(t){var n=toObject(this),r=splitString&&_toString(this)==="[object String]"?this.split(""):n,i=arguments[1],s=-1,o=r.length>>>0;if(!isFunction(t)){throw new TypeError}while(++s<o){if(s in r){t.call(i,r[s],s,n)}}}}
// {}.keys shim
if(!Object.keys){Object.keys=function(){"use strict";var e=Object.prototype.hasOwnProperty,t=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(i){if(typeof i!=="object"&&(typeof i!=="function"||i===null)){throw new TypeError("Object.keys called on non-object")}var s=[],o,u;for(o in i){if(e.call(i,o)){s.push(o)}}if(t){for(u=0;u<r;u++){if(e.call(i,n[u])){s.push(n[u])}}}return s}}()}

function queueFiles(i, file){
	if( file.charAt(0) === '!' ){
		toIgnore.push(file);
	} else {
		toRequire.push(file);
	}
}

// run selector filters
for(var sel in config.selectors){

	if( $(sel).length === 0 )
		continue;

	$.each(config.selectors[sel], queueFiles);

}

// require the files if not in toIgnore
$.each(toRequire, function (i, moduleId) {
	if($.inArray('!' + module, toIgnore) === -1){
		var module = require(moduleId);

		if( $.isFunction(module) ){
			module();
		}
	}
});

// browserfiy solution
// ========
return;  require('./modules/sampleModule');  require('./views/sampleView'); 