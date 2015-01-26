
module.exports = function() {

	$('button.toggle-search').on('click touch tap', function(e){
		$('body').toggleClass('js-search-open');
		e.preventDefault();
	});

	// Scroll to Content with ID
	$('a[href*=#]:not([href=#]):not(.form_step)').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {

			var targetH = $(this.hash),
				target = targetH.length ? targetH : $('[name=' + this.hash.slice(1) +']');

			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 800);
				return false;
			}
		}
	});
}

