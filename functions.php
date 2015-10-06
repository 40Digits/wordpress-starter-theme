<?php

// --------------------------------
// Required
// --------------------------------

// Environment Management
include_once('functions/environment.php');

// Enqueue Scripts
include_once('functions/wordpress/enqueue_scripts.php');

// Core Registrations
include_once('functions/core/custom-post_types.php');
include_once('functions/core/custom-taxonomies.php');
include_once('functions/core/custom-sidebars.php');
include_once('functions/core/custom-menus.php');
include_once('functions/core/custom-crops.php');

// Partials Include Function
include_once('functions/site/get-partial-path.php');

// --------------------------------
// Options
// --------------------------------

// Utility Functions
include_once('functions/wordpress/utility.php');

// Add Admin Menu Seperators
include_once('functions/wordpress/admin-sidebar-separators.php');
