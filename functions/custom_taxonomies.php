<?php
// http://codex.wordpress.org/Function_Reference/register_taxonomy



function register_taxonomies()
{

/*


register_taxonomy(
	'market', // taxononmy ID. Make this unique from CPTs and Pages to avoid URL rewrite headaches.
	array(
		'portfolio' // applicable post type
	),
	array(
		'hierarchical' => true,
		'show_ui' => true,
		'public' => true,
		'label' => __('Market'),
		'show_in_nav_menus' => true,
		'labels' => array(
			'add_new_item' => 'Add New Market'
		),
		'query_var' => true,
	)
);


*/


}

add_action('init', 'register_taxonomies');