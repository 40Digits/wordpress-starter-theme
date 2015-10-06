<?php

// Registers admin menu separators
add_action( 'admin_menu','admin_menu_separator' );

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
	add_admin_menu_separator(28);
	// Add separator after defined CPT
	add_admin_menu_separator(35);
}