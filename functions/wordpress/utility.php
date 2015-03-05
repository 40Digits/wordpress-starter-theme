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
