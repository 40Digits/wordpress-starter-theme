module.exports = function() {

	// This module gives you access to our media queries in any other js module.
	// Usage in other modules: "require('./setupMqSync')()".

	require('../plugins/mediaQuerySync');

	var mqOrder = [
			'mq-tiny',
			'mq-mini',
			'mq-small',
			'mq-medium',
			'mq-large',
			'mq-xlarge',
			'mq-xxlarge',
			'mq-xxxlarge'
		];

	$.mqSync.setOrder(mqOrder);

};