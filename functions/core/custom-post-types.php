<?php

	// http://codex.wordpress.org/Function_Reference/register_post_type

function register_custom_post_types() {

	/*
	 * Duplicate this for each CPT.


	// --------------------------------
	// CPT Name
	// --------------------------------

	$labels = array(
		'name' => _x('Movies', 'post type general name'),
		'singular_name' => _x('Movie', 'post type singular name'),
		'add_new' => _x('Add New', 'movie'),
		'add_new_item' => __('Add New Movie'),
		'edit_item' => __('Edit Movie'),
		'new_item' => __('New Movie'),
		'view_item' => __('View Movie'),
		'search_items' => __('Search Movies'),
		'not_found' =>  __('No Movies found'),
		'not_found_in_trash' => __('No Movies found in Trash'),
		'parent_item_colon' => '',
		'menu_name' => 'Movies'
	);
	$args = array(
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'show_in_nav_menus' => false,
		'query_var' => true,
		'rewrite' => array('slug' => 'movies'),
		'capability_type' => 'post',
		'has_archive' => true,
		'hierarchical' => false,
		'menu_position' => 29,
		'menu_icon' => 'dashicons-groups',
		'supports' => array('title', 'page-attributes')
	);
	register_post_type('portfolio', $args);

	*/

}
add_action( 'init', 'register_custom_post_types' );
