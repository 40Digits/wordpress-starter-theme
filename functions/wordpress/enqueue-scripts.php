<?php

function enqueue_custom_scripts() {

	// Add main stylesheet
	wp_register_style('style-main', (get_stylesheet_directory_uri() . '/style.css'), false, false, 'screen');
	wp_enqueue_style('style-main');

	// Add print stylesheet
	wp_register_style('style-print', (get_stylesheet_directory_uri() . '/print.css'), false, false, 'print');
	wp_enqueue_style('style-print');

	// Remove default jQuery and add Google hosted version to the footer
	wp_deregister_script('jquery-core');
	wp_register_script('jquery-core', ('//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'), false, '3.2.1', true);
	wp_enqueue_script('jquery-core');

	// Load the site's main.js file but make sure jQuery is there first
	wp_register_script('script-main', (get_stylesheet_directory_uri() . '/assets/js/main.js'), array('jquery'), '1.0.0', true);
	wp_enqueue_script('script-main');

}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_scripts' );
