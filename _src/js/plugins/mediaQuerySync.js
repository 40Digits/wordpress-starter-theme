(function ($) {

	$.mqSync = {
		$listenElement: {},
		currentMediaQuery: '', // The current media query

		/**
		 * Set up the media query plugin
		 * @param options The options to pass at run time
		 */
		init: function (options) {
			window.mqOrderNamed = !!(window.mqOrderNamed) ? window.mqOrderNamed : {};
			window.mqOrderNumbered = !!(window.mqOrderNumbered) ? window.mqOrderNumbered : [];

			this.$listenElement = $('head');

			// Initialize the media query
			this.currentMediaQuery = this.fetchMediaQuery();
			$('body').data('media-query', this.currentMediaQuery);

			// On window resize, set media query var
			$(window).resize(this.onResize);
		},

		/**
		 * Check if the media query name is a match
		 * @param which The media query to check against
		 */
		matches: function (which) {
			// See if the current media query matches the requested one
			return (this.fetchMediaQuery() == which);
		},


		/**
		 * Check if the media query is greater than the specified
		 * @param which The media query to check against
		 */
		isAbove: function (which) {
			var currentMq = window.mqOrderNamed[this.fetchMediaQuery()],
				whichMq = window.mqOrderNamed[which];

			return (currentMq >= whichMq);
		},


		/**
		 * Check if the media query is less than the specified
		 * @param which The media query to check against
		 */
		isBelow: function (which) {
			var currentMq = window.mqOrderNamed[this.fetchMediaQuery()],
				whichMq = window.mqOrderNamed[which];

			return (currentMq < whichMq);
		},


		/**
		 * When the browser is resized, update the media query
		 */
		onResize: function () {
			var lastQuery = this.currentMediaQuery;

			// Set the global current media query
			this.currentMediaQuery = $.mqSync.fetchMediaQuery();

			// The media query does not match the old
			if (this.currentMediaQuery != lastQuery) {
				// Fire an event noting that the media query has changed
				$('html').trigger('mediaQueryChange', [this.currentMediaQuery, lastQuery]);
				$('body').data('media-query', this.currentMediaQuery);
			}

		},


		/**
		 * Read in the media query
		 */
		fetchMediaQuery: function () {
			// We read in the media query name from the html element's font family
			var mq = this.$listenElement.css('font-family');

			// Strip out quotes and commas
			mq = mq.replace(/['",]/g, '');

			return mq;
		},


		/**
		 * Set the order of media queries
		 * @param orderedArray An array of the media queries in order from smallest to largest
		 */
		setOrder: function (orderedArray) {
			var self = this;

			this.mqOrderNumbered = orderedArray;

			$.each(orderedArray, function(index, value) {
				self.mqOrderNamed[value] = index;
			});
		},

		/**
		 * This module resizes responsive images automatically
		*/
		responsiveImages: {

			/**
			 * Initialize events
			 */
			init: function() {
				var self = this;

				// Every time the media query changes, do these things
				function onMediaQueryChange (event, newMediaQuery, oldMediaQuery) {
					self.update(newMediaQuery);
				}

				$('html').on('mediaQueryChange', onMediaQueryChange);

				// Loop through each and store its original source
				$('.mqsync-responsive').each(function () {
					storeOriginalSource($(this));
				});

				// Update the current responsive image size
				this.update();
			},

			/**
			 * Store the original source in case it's needed later
			 * @param $whichElement Which element to store the source on
			 */
			storeOriginalSource: function ($whichElement) {
				var imageSrc;

				if ($image.is('img'))
					imageSrc = $image.attr('src');
				else
					imageSrc = $image.css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');

				$image.data('original-src', imageSrc);
			},

			/**
			 * Run through each responsive image and see if an image exists at that media query
			 * @param newMediaQuery [current] The new media query to load
			 */
			update: function (newMediaQuery) {
				var $responsiveImages = $('.mqsync-responsive'),
					self = this;

				// Default to the current media query - just run an update
				if (newMediaQuery == null)
					newMediaQuery = $.mqSync.fetchMediaQuery();

				// Loop over each responsive image and update its source
				$responsiveImages.each(function () {
					var mqOrderNumbered = $.mqSync.mqOrderNumbered,
						$img = $(this),
						mqMax = 0,
						currentSource = null;

					mqMax = $.mqSync.mqOrderNamed[newMediaQuery];

					// If there is an ordered list of media queries
					if ($.mqSync.mqOrderNumbered.length > 0) {
						// Loop backwards and find the nearest match
						for (var ii = mqMax; ii >= 0; ii--) {
							currentSource = $img.data($.mqSync.mqOrderNumbered[ii] + '-src');

							if (currentSource != null) {
								break;
							}
						}
					} else {
						// No ordered list of media queries, so just check the current
						currentSource = $img.data(newMediaQuery + '-src');
					}

					if (currentSource) {
						// There is an image supplied for this media query
						self.swapImage($img, currentSource);
					} else {
						// Default to the original image
						self.swapImage($img, $img.data('original-src'));
					}
				});

			},


			/**
			 * Swap out either an <img>s source or the background image of another element.
			 * @param $target The jQuery element you want to swap an image on
			 * @param newImageSrc The source for the new image to use
			 */
			swapImage: function($target, newImageSrc) {
				if ($target.is('img'))
 					$target.attr('src', newImageSrc);
 				else
 					$target.css('background-image', 'url(' + newImageSrc + ')');
			}

		}, // End responsive images module


		/**
		 * This module resizes children to all have the same height
		*/
		responsiveSameheight: {
			$responsiveContainers: {},

			/**
			 * Initialize events
			 */
			init: function () {
				var self = this;

				$responsiveContainers = $('.mqsync-sameheight');

				// Every time the media query changes, do these things
				function onMediaQueryChange (event, newMediaQuery, oldMediaQuery) {
					self.update(newMediaQuery);
				}

				$('html').on('mediaQueryChange', onMediaQueryChange);

				this.update();
			},

			/**
			 * Adjust the height of the children elements
			 */
			update: function () {
				console.log('update');
				// Loop over all the responsive sameheight containers
				$responsiveContainers.each(function () {
					var $children = $(this).children(),
						maxHeight = 0;

					// Loop over each and get the tallest one
					$children.each(function () {
						var $element = $(this),
							elementHeight;

						$element.height('auto');
						elementHeight = $element.height();

						if (elementHeight > maxHeight)
							maxHeight = elementHeight;
					});

					// Set them all to that height
					$children.height(maxHeight);
				});
			}

		} // End responsive sameheight module

	};


	// Do this stuff when the page is ready
	$(document).ready(function () {
		$.mqSync.init();
	});

}(jQuery));