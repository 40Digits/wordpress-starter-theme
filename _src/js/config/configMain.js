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