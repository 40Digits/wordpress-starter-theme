<?php
// Disallow Theme Edits
define('DISALLOW_FILE_EDIT',true);

// Forcing IE Compatibility Mode
header('X-UA-Compatible: IE=Edge');

// Clean up WP Header
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'start_post_rel_link');
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');

// Add Wordpress Feature Support
add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'html5' );

// Disable WP emoji
function disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
}
add_action( 'init', 'disable_emojis' );
function disable_emojis_tinymce( $plugins ) {
	if ( is_array( $plugins ) ) {
		return array_diff( $plugins, array( 'wpemoji' ) );
	} else {
		return array();
	}
}

// Move Yoast SEO to bottom of admin pages
function move_yoast_to_bottom() {
  return 'low';
}
add_filter( 'wpseo_metabox_prio', 'move_yoast_to_bottom');

// Hide WP Admin Bar
// add_filter( 'show_admin_bar', '__return_false' );

// Add Wysiwyg styles to the Wordpress editor.
// You need to create your own 'style-wysiwyg.scss' inside of _src/sass
// function wysiwyg_editor_styles() {
// 	add_editor_style( 'style-wysiwyg.css' );
// }
// add_action( 'admin_init', 'wysiwyg_editor_styles' );