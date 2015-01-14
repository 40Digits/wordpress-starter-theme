<?php

// Registers admin menu separators
add_action('admin_menu','admin_menu_separator');


// Create Admin Menu Separator
function add_admin_menu_separator($position) {

	global $menu;
	$index = 0;

	foreach($menu as $offset => $section) {
		if (substr($section[2],0,9)=='separator')
		    $index++;
		if ($offset>=$position) {
			$menu[$position] = array('','read',"separator{$index}",'','wp-menu-separator');
			break;
	    }
	}

	ksort( $menu );
}

// Adds Admin Menu Separators
function admin_menu_separator() {

	// Add custom separator after contact
	add_admin_menu_separator(27);
	// Add separator after blog custom post types
	add_admin_menu_separator(35);
}

// Enque custom CPT icons
function forty_cpt_icons() {
    wp_enqueue_style('forty-cpt-icons', get_template_directory_uri() . '/style-cpt.css');
}
add_action('admin_enqueue_scripts', 'forty_cpt_icons');