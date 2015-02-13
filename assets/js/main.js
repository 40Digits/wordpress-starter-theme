(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
///////////////////////////////////////////////////////////////////////////
//                                                                       //
//   HELLO DEV. All your custom code should go in its own file in this   //
//   directory. Configuration (selectors and whatnot) should go in the   //
//   `_config.js` file. Check the README or ask someone if you have      //
//   any questions. Happy developing!                                    //
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
},{"./config/configMain":2,"./modules/sampleModule":3,"./views/sampleView":4}],2:[function(require,module,exports){
module.exports = {
  /*
  jQuery selectors that include listed files when found on current page.

  TIPS:
    - Start all files with ./ to indicate their path relative to this file.
    - Leave off the file extension.
    - Overqualify your selectors as much as you can for performance optimization!
    - Prepending a ! in front of the name will make sure the file is not included
      when that selector is found.

  Example:
    'body.anotherTemplate': ['./this_one', '!./not_this_one']
  */
  selectors: {
    'div.module':   ['./modules/sampleModule'],
    'div.sample':   ['./views/sampleView']
  }
};
},{}],3:[function(require,module,exports){
module.exports = function() {
  console.log('Sample Module');
}
},{}],4:[function(require,module,exports){

module.exports = function() {
	console.log('Sample View');
}
},{}]},{},[1]);
