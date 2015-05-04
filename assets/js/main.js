(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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
	$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null),
	toRequire = [],
	toIgnore = [];

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
return;  require('./lib/polyfill.object.keys');  require('./lib/polyfill.array.forEach');  require('./modules/responsiveImages');  require('./modules/sampleModule');  require('./views/sampleView'); 
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./config/configMain":2,"./lib/polyfill.array.forEach":4,"./lib/polyfill.object.keys":5,"./modules/responsiveImages":6,"./modules/sampleModule":7,"./views/sampleView":9}],2:[function(require,module,exports){
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

		// defaults
		'html.lt-ie10':        ['./lib/polyfill.object.keys', './lib/polyfill.array.forEach'],
		'.mqsync-responsive':  ['./modules/responsiveImages'],

		// samples
		'div.module':          ['./modules/sampleModule'],
		'div.sample':          ['./views/sampleView']
	}
};
},{}],3:[function(require,module,exports){
(function (global){
(function (factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory((typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null), window, document);
	} else {
		factory(jQuery, window, document);
	}
}(function($, window, document) {

	var	$body = $('body'),
		$orderElement = $('title'),
		$listenElement = $('head'),
		mqOrderNamed = !!(mqOrderNamed) ? mqOrderNamed : {},
		mqOrderNumbered = !!(mqOrderNumbered) ? mqOrderNumbered : [],

		currentMediaQuery,
		mqSync = {},

		/**
		 * Set up the media query plugin
		 */
		init = function() {
			// setup public stuff
			mqSync = {
				listenElement: $listenElement,
				responsiveImages: responsiveImages,
				isBelow: checkBelow,
				isAbove: checkAbove
			};

			currentMediaQuery = fetchMediaQuery();
			$body.data('media-query', currentMediaQuery);
			
			// set the order of the breakpoints
			setOrder();

			// On window resize, set media query var
			$(window).resize(onResize);

			$.mqSync = mqSync;
		},

		/**
		 * Check if the media query name is a match
		 * @param which The media query to check against
		 */
		matches = function(which) {
			// See if the current media query matches the requested one
			return (fetchMediaQuery() == which);
		},

		/**
		 * Check if the media query is greater than the specified
		 * @param which The media query to check against
		 */
		checkAbove = function (which) {
			var currentMq = mqOrderNamed[fetchMediaQuery()],
				whichMq = mqOrderNamed[which];

			return (currentMq >= whichMq);
		},

		/**
		 * Check if the media query is less than the specified
		 * @param which The media query to check against
		 */
		checkBelow = function (which) {
			var currentMq = mqOrderNamed[fetchMediaQuery()],
				whichMq = mqOrderNamed[which];

			return (currentMq < whichMq);
		},

		/**
		 * When the browser is resized, update the media query
		 */
		onResize = function () {
			var lastQuery = currentMediaQuery;

			// Set the global current media query
			currentMediaQuery = fetchMediaQuery();

			// The media query does not match the old
			if (currentMediaQuery != lastQuery) {
				// Fire an event noting that the media query has changed
				mqSync.listenElement.trigger('mediaQueryChange', [currentMediaQuery, lastQuery]);
				$body.data('media-query', currentMediaQuery);
			}
		},

		/**
		 * Read in the media query
		 */
		fetchMediaQuery = function () {
			// We read in the media query name from the html element's font family
			var mq = mqSync.listenElement.css('font-family');

			// Strip out quotes and commas
			mq = mq.replace(/['",]/g, '');

			return mq;
		},

		/**
		 * Set the order of media queries
		 * @param orderedArray An array of the media queries in order from smallest to largest
		 */
		setOrder = function () {
			var mediaQueries = $orderElement.css('font-family');
			mqOrderNumbered = mediaQueries.replace("'", "").split(',');
			$.each(mqOrderNumbered, function(index, value) {
				mqOrderNamed[value] = index;
			});
		},

		/**
		 * This module resizes responsive images automatically
		 * @param $el jQuery object or string element reference
		*/
		responsiveImages = function($el) {

				// set up valid images variable. checks if the param is a string or jquery element
			var $images = ( typeof $el === 'string' ) ? $($el) : $el,
				// set up the responsive images to manipulate. uses default if undefined
				$responsiveImages = $images ? $images : $('.mqsync-responsive'),
				// array to hold all known src's attached to images
				knownSizes = [],

				init = function() {
					var $img;

					// When the media query changes
					mqSync.listenElement.on('mediaQueryChange', onMediaQueryChange);

					// Loop through each and store its original source
					$responsiveImages.each(function() {
						$img = $(this);
						storeSizes($img);
					});

					// Update the current responsive image size
					update();
				},

				// Every time the media query changes, do these things
				onMediaQueryChange = function(event, newMediaQuery) {
					update(newMediaQuery);
				},

				/**
				 * Store the image sources attached to each responsive image, making each check on mq change more effecient
				 * @param $image Which element to pull sizes from
				 */
				storeSizes = function($image) {
					var $img = $image,
						sizes = {},
						mqName;

					sizes.image = $img;
					sizes.loaded = [];
					sizes['original-src'] = sizes['active-src'] = getSource($img);

					// loop over all the data attr's on the image
					$.each($img.data(), function(key, value) {
						// jQuery turns data attr's into camelcase strings, so make sure they are dashed instead
						mqName = toDashed(key);
						// make sure the stores src is an absolute url
						sizes[mqName] = value;
					});

					// add the sizes for this image to the array
					knownSizes.push(sizes);
				},

				/**
				 * Turns camelcase string into dashed
				 * @param string The string to manipulate
				 */
				toDashed = function(string) {
					var words = [],
						currentChar = '',
						currentWord = '',
						i = 0;

					for (i; string.length >= i; i++) {
						currentChar = string.charAt(i);
						
						if ( currentChar === currentChar.toUpperCase() ) {
							words.push(currentWord);
							currentWord = currentChar.toLowerCase();
						} else {
							currentWord = currentWord + currentChar;
						}
					}
					
					words = words.join('-');
					return words;
				},

				/**
				 * Return the current image source
				 * @param $image Which element to store the source on
				 */
				getSource = function ($image) {
					var imageSrc;

					if ($image.is('img')) {
						imageSrc = $image.attr('src');
					} else {
						imageSrc = $image.css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
					}

					return imageSrc;
				},

				/**
				 * Run through each responsive image and see if an image exists at that media query
				 * @param newMediaQuery [current] The new media query to load
				 */
				update = function (newMediaQuery) {
					var isLoaded = false;

					// Default to the current media query - just run an update
					if (newMediaQuery == null)
						newMediaQuery = fetchMediaQuery();

					// Loop over each known size and update the image src if it has one for this breakpoint
					$.each(knownSizes, function (i) {
						// store the current image object in the loop
						var currentImage = knownSizes[i],
							// store the new source from the know sizes if there is one
							newSource = currentImage[newMediaQuery];

						// if a new source isn't set
						if (!newSource) {
							var ii = mqOrderNamed[newMediaQuery],
								mq;

							// decrement through the numbered mq's
							for (ii; ii > 0; ii--) {
								mq = mqOrderNumbered[ii];

								// if a matched mq is found on the image
								if (currentImage[mq]) {
									// set the new source
									newSource = currentImage[mq];
									break; // break that loop
								}
							}
							// if after all that no source was found then just revert back to the original source
							newSource = newSource || currentImage['original-src'];
						}

						// if the new source is not the active source
						if (newSource.indexOf(currentImage['active-src']) === -1) {

							// loop over all loaded images and see if the new source has been loaded
							$.each(currentImage.loaded, function(i) {
								if (currentImage.loaded[i].indexOf(newSource) > 0) {
									isLoaded = true;
									return;
								}
							});

							// if the new source has been loaded
							if (isLoaded) {
								// There is an image supplied for this media query
								swapImage(currentImage.image, newSource);
							} else {
								// preload the image to swap
								preload(newSource, function(src) {
									// There is an image supplied for this media query
									swapImage(currentImage.image, src);
									// update the list of loaded src's
									currentImage.loaded.push(src);
								});
							}

							// update the active src
							currentImage['active-src'] = newSource;
						}
					});
				},

				/**
				 * Swap out either an <img>s source or the background image of another element.
				 * @param $target The jQuery element you want to swap an image on
				 * @param newImageSrc The source for the new image to use
				 */
				swapImage = function($target, newImageSrc) {
					if ($target.is('img')) {
	 					$target.attr('src', newImageSrc);
					} else {
						$target.css('background-image', 'url(' + newImageSrc + ')');
					}
				},

				/**
				 * Preload the new image before inserting it into the DOM
				 * @param src The source of the image to load
				 * @param callback The function to call when the image is loaded
				 */
				preload = function(src, callback) {
					var img, imgLoaded = $.Deferred();
					(function(url, imgLoaded) {
						img = new Image();
						img.onload = function() {
							imgLoaded.resolve();
						};
						img.src = url;
					})(src, imgLoaded);

					// when the image is loaded trigger the callback
					$.when($, imgLoaded).then(function() {
						callback(img.src);
						// clear the memory of that image
						img = null;
					});
				};

			init();
		};

	// set everything up
	init();

}));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
module.exports = function() {

	// [].forEach polyfill
	// Production steps of ECMA-262, Edition 5, 15.4.4.18
	// Reference: http://es5.github.io/#x15.4.4.18
	if (!Array.prototype.forEach) {

		Array.prototype.forEach = function(callback, thisArg) {

			var T, k;

			if (this == null) {
				throw new TypeError(' this is null or not defined');
			}

			// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
			var O = Object(this);

			// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
			// 3. Let len be ToUint32(lenValue).
			var len = O.length >>> 0;

			// 4. If IsCallable(callback) is false, throw a TypeError exception.
			// See: http://es5.github.com/#x9.11
			if (typeof callback !== "function") {
				throw new TypeError(callback + ' is not a function');
			}

			// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
			if (arguments.length > 1) {
				T = thisArg;
			}

			// 6. Let k be 0
			k = 0;

			// 7. Repeat, while k < len
			while (k < len) {

				var kValue;

				// a. Let Pk be ToString(k).
				//   This is implicit for LHS operands of the in operator
				// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
				//   This step can be combined with c
				// c. If kPresent is true, then
				if (k in O) {

					// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
					kValue = O[k];

					// ii. Call the Call internal method of callback with T as the this value and
					// argument list containing kValue, k, and O.
					callback.call(T, kValue, k, O);
				}
				// d. Increase k by 1.
				k++;
			}
			// 8. return undefined
		};
	}
}
},{}],5:[function(require,module,exports){
module.exports = function() {
	// {}.keys polyfill
	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	if (!Object.keys) {
		Object.keys = (function() {
			'use strict';
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;

			return function(obj) {
				if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
					throw new TypeError('Object.keys called on non-object');
				}

				var result = [], prop, i;

				for (prop in obj) {
					if (hasOwnProperty.call(obj, prop)) {
						result.push(prop);
					}
				}

				if (hasDontEnumBug) {
					for (i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
						}
					}
				}
				return result;
			};
		}());
	}
}
},{}],6:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
require('../lib/jquery.mqSync');

module.exports = function() {
	// make those images responsive
	$.mqSync.responsiveImages();

};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/jquery.mqSync":3}],7:[function(require,module,exports){
module.exports = function() {
	console.log('Sample Module');
}
},{}],8:[function(require,module,exports){
module.exports=(function() {var t = function anonymous(locals, filters, escape, rethrow) {
escape = escape || function (html){
  return String(html)
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
var buf = [];
with (locals || {}) { (function(){ 
 buf.push('<h1>', escape((1,  data )), ' World</h1>'); })();
} 
return buf.join('');
}; return function(l) { return t(l) }}())
},{}],9:[function(require,module,exports){
module.exports = function() {
	console.log('Sample EJS Template');

	var sampleTemplate = require('../templates/sampleTemplate.ejs');
	console.log(sampleTemplate({ data: "Hello" }));
}
},{"../templates/sampleTemplate.ejs":8}]},{},[1]);
