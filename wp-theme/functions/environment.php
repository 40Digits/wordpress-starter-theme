<?php

if( ENVIRONMENT != 'production' ){

	// discourage search engines on non-production sites always.
	function forty_no_search_engines(){
		return "User-agent: *
Disallow: /";
	}
	add_action('robots_txt', 'forty_no_search_engines', 100);

}