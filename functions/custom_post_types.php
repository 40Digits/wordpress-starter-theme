<?php
// http://codex.wordpress.org/Function_Reference/register_post_type

function register_CPTs()
{

	/*

	// Duplicate this for each CPT.

	$labels = array(
		'name' => _x('Portfolio', 'post type general name'),
		'singular_name' => _x('Portfolio Item', 'post type singular name'),
		'add_new' => _x('Add New', 'portfolio'),
		'add_new_item' => __('Add New Portfolio Item'),
		'edit_item' => __('Edit Portfolio Item'),
		'new_item' => __('New Portfolio Item'),
		'view_item' => __('View Portfolio Item'),
		'search_items' => __('Search Portfolio'),
		'not_found' =>  __('No Portfolio Items found'),
		'not_found_in_trash' => __('No Portfolio Items found in Trash'),
		'parent_item_colon' => '',
		'menu_name' => 'Portfolio'

	);
	$args = array(
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'show_in_nav_menus' => true,
		'query_var' => true,
		'rewrite' => Array('slug'=>'project'),
		'capability_type' => 'post',
		'has_archive' => true,
		'hierarchical' => false,
		'menu_position' => 21,
		'supports' => array('title','page-attributes')
	);

	register_post_type('portfolio',$args);


	*/

}

add_action('init', 'register_CPTs');