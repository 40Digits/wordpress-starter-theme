<?php

// Environment Management
include_once('functions/environment.php');

// Enqueue Scripts
include_once('functions/wordpress/enqueue-scripts.php');

// Core Registrations
include_once('functions/wordpress/custom-post-types.php');
include_once('functions/wordpress/custom-taxonomies.php');
// include_once('functions/wordpress/custom-sidebars.php');
// include_once('functions/wordpress/custom-menus.php');
// include_once('functions/wordpress/custom-crops.php');

// Utility Functions
include_once('functions/wordpress/utility.php');

// Partials Include Function
// include_once('functions/wordpress/get-partial-path.php');

// Add Admin Menu Seperators
include_once('functions/wordpress/admin-sidebar-separators.php');

// Disable Post Type Support
// include_once('functions/wordpress/disable-post-type-support.php');
