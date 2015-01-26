<?php

// HIDE ADMIN BAR ALWAYS
//add_filter( 'show_admin_bar', '__return_false' );

// REMOVE DEFAULT JQUERY & LOAD GOOGLE IN FOOTER
add_action( 'wp_enqueue_scripts', 'no_wp_jquery' );
function no_wp_jquery(){
	wp_deregister_script('jquery');
	wp_register_script('jquery', ('//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'), false, '1.11.0', true);
	wp_enqueue_script('jquery');
}


// CLEAN UP WP HEAD
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'start_post_rel_link');
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');


// ADD WORDPRESS FEATURE SUPPORT
add_theme_support( 'post-thumbnails' );
add_theme_support( 'menus' );


// ADD CUSTOM PHOTO CROPS
if ( function_exists( 'add_image_size' ) ) {
	// add_image_size( 'crop-name', 300, 300, true );
}


// CUSTOM FILES
include_once('functions/custom_post_types.php');
include_once('functions/custom_taxonomies.php');
include_once('functions/custom_sidebars.php');

// CUSTOM FUNCTIONS
include_once('functions/wordpress/utility.php');

// Add CPT icons as well as seperators to the admin menu
include_once('functions/wordpress/admin-menu.php');

// ENVIRONMENT STUFF
include_once('functions/environment.php');



// SECURITY STUFF
define('DISALLOW_FILE_EDIT', true);