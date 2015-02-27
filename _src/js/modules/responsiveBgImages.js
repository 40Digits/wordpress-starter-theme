module.exports = function() {

	// pull in mqSync setup module
	require('./setupMqSync')();

	$.mqSync.responsiveBgImages = {

		init: function() {
			var self = this;

			function onMediaQueryChange (event, newMediaQuery, oldMediaQuery) {
				self.update(newMediaQuery);
			}

			$('html').on('mediaQueryChange', onMediaQueryChange);

			$('.mq-sync').each(function () {
				var originalBgSrc = $(this).css('background-image').replace('url(','').replace(')','');

				$(this).data('original-src', originalBgSrc);
			});

			this.update();
		},

		update: function (newMediaQuery) {
			// Default to the current media query - just run an update
			if (newMediaQuery == null)
				newMediaQuery = $.mqSync.fetchMediaQuery();

			// Loop over each responsive image and update its source
			$('.mq-sync').each(function () {
				var mqOrderNumbered = $.mqSync.mqOrderNumbered,
					$el = $(this),
					mqMax = 0,
					currentSource = null;

				mqMax = $.mqSync.mqOrderNamed[newMediaQuery];

				// If there is an ordered list of media queries
				if ($.mqSync.mqOrderNumbered.length > 0) {
					// Loop backwards and find the nearest match
					for (var ii = mqMax; ii >= 0; ii--) {
						currentSource = $el.data($.mqSync.mqOrderNumbered[ii] + '-src');

						if (currentSource != null) {
							break;
						}
					}
				} else {
					// No ordered list of media queries, so just check the current
					currentSource = $el.data(newMediaQuery + '-src');
				}

				if (currentSource) {
					// There is an image supplied for this media query
						$el.css('background-image', 'url(' + currentSource + ')');
				} else {
					// Default to the original image
					$el.css('background-image', 'url(' + $el.data('original-src') + ')');
				}
			});
		}
	}

	$.mqSync.responsiveBgImages.init();
};