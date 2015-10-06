<!DOCTYPE html>
<!--[if lte IE 9]><html class="no-js lt-ie10"><![endif]-->
<!--[if gt IE 9]><!--><html class="no-js" lang="en"><!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<title><?php wp_title('&raquo;','true','right'); ?></title>

  	<script>
		// Place Google Analytics code here - note that any <noscript> iframes
		// will break <head>, so include it after <body> if you need that snippet

		// Set up site configuration
		window.config = window.config || {};

		// The base URL for the WordPress theme
		window.config.baseUrl = "<?php echo get_bloginfo('url'); ?>";

		// Empty default Gravity Forms spinner function
		var gformInitSpinner = function() {};
	</script>

	<?php
		// Make sure you go through this file and remove what you aren't using
		include( get_stylesheet_directory() . '/functions/site/theme-meta.php' );
	?>

	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
