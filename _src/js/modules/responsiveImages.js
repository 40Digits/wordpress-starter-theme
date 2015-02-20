module.exports = function() {

	// pull in mqSync setup module
	require('./setupMqSync')();

	// make those images responsive
	$.mqSync.responsiveImages.init();

};