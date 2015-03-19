<?php

// if the environment hasn't been set, default to
if ( !defined('WP_ENV') ) {
	define('WP_ENV', 'production');
}

if ( WP_ENV != 'production' ) {

	// discourage search engines on non-production sites
	function forty_no_search_engines() {
		return "User-agent: *
Disallow: /";
	}
	add_action('robots_txt', 'forty_no_search_engines', 100);

}