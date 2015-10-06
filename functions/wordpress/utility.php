<?php

//---------------------------------
// Required
//---------------------------------

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
