(function (factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory(require("jquery"), window, document);
	} else {
		factory(jQuery, window, document);
	}
}(function($, window, document) {

	var	$body = $('body'),
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
			var mediaQueries = window.getComputedStyle(mqSync.listenElement.get(0), ':after').getPropertyValue('font-family');
			mqOrderNumbered = mediaQueries.replace(/['"\s]/g, '').split(',');
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
					var isLoaded;

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
						if (!newSource.includes(currentImage['active-src'])) {

							// loop over all loaded images and see if the new source has been loaded
							$.each(currentImage.loaded, function(i) {
								isLoaded = currentImage.loaded[i].includes(newSource);
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