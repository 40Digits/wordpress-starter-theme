<?php

// Remove default jQuery and add Google hosted version to the footer
// Are you building a site that requires IE8?
// Consider using: //ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
function enqueue_custom_jquery() {
	wp_deregister_script('jquery');
	wp_register_script('jquery', ('//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'), false, '2.1.3', true);
	wp_enqueue_script('jquery');
}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_jquery', 0 );

// Add modernizr to the header
function enqueue_custom_modernizr() {
	wp_register_script('modernizr', (get_bloginfo('template_directory') . '/assets/js/vendor/modernizr.js'), false, '2.8.3', false);
	wp_enqueue_script('modernizr');
}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_modernizr', 0 );

// Functions (Required)
include_once('functions/wordpress/custom_post_types.php');
include_once('functions/wordpress/custom_taxonomies.php');
include_once('functions/wordpress/custom_sidebars.php');

// Functions (Utility)
include_once('functions/wordpress/utility.php');

// Add CPT icons and seperators to the admin menu
include_once('functions/wordpress/admin-menu.php');

// Environment Management
include_once('functions/environment.php');