<?php

//---------------------------------
// Required
//---------------------------------

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

// Get a cleaner template name for pages - use as ID or class in your template containers
// Called on <body> in header.php
function get_template_name() {
	if (is_page()) {
		global $post;
		return str_replace('.php', '', get_post_meta($post->ID, '_wp_page_template', true));
	}
	return '';
}

// Add Wysiwyg styles to the Wordpress editor.
function wysiwyg_editor_styles() {
	add_editor_style( 'style-wysiwyg.css' );
}
add_action( 'admin_init', 'wysiwyg_editor_styles' );

// This function gets the path to a partial based on keeping the /partials/ standard
// Allows for use of dot notation, i.e. get_partial_path(sub-dir.component) = theme/partials/sub-dir/component.php
function get_partial_path($name, $extension = 'php', $partials_dir = '/partials/') {
	$name = str_replace('.', '/', $name);

	// Quality checks for paths n stuff
	if ($extension[0] === '.')
		$extension = substr($extension, 1);

	if ($partials[0] !== '/')
		$partials = '/' . $partials;

	if ($partials[strlen($partials) - 1] !== '/')
		$partials = $partials . '/';

	return get_template_directory() . $partials_dir . $name . '.' . $extension;
}

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

//---------------------------------
// Optional
//---------------------------------

// Hide WP Admin Bar
//add_filter( 'show_admin_bar', '__return_false' );

// Add custom photo sizes - remember that this creates extra files for every upload
// if ( function_exists( 'add_image_size' ) ) {
	// add_image_size( 'crop-name', 300, 300, true );
// }

// Add responsive container to embed videos
// function forty_responsive_video( $html ) {
// 	//add http protocol
//     $html = str_replace('<iframe src="//', '<iframe src="http://', $html);
//     return '<div class="flex-video">' . $html . '</div>';
// }
// add_filter( 'embed_oembed_html', 'forty_responsive_video', 10, 3 );
// add_filter( 'video_embed_html', 'forty_responsive_video' );


// Returns timthumbified URL
// function forty_timthumbify($src){
// 	global $blog_id;
// 	if(is_multisite()){
// 		$blog_upload_dir = get_site_url(1).'/wp-content/blogs.dir/'.$blog_id;
// 		$src = get_site_url(1).'/functions/timthumb/timthumb.php?src='.$blog_upload_dir.strstr($src, '/files/');
// 	}else
// 		$src = get_stylesheet_directory_uri() . '/functions/timthumb/timthumb.php?src=' . $src;

// 	return $src;
// }
