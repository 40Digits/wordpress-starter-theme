var $ = require('jquery');

module.exports = function() {
	
	// jQuery plugin to get a fresh reference to a DOM element
	$.fn.refresh = function() {
		var e = $(this.selector);

		this.splice(0,this.length);
		this.push.apply(this,e);
		
		return this;
	};
}