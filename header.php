<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<title><?php wp_title('&raquo;', 'true', 'right'); ?></title>

		<script>
		// Set up site configuration
		window.config = window.config || {};
		// The base URL for the WordPress theme
		window.config.baseUrl = "<?php echo get_bloginfo('url'); ?>";
		// Empty default Gravity Forms spinner function
		// var gformInitSpinner = function() {};
	</script>

	<?php
		// Make sure you go through this file and remove what you aren't using
		// include( get_stylesheet_directory() . '/functions/site/theme-meta.php' );
	?>

	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

	<?php
		// SVG Sprite for symbols. Make sure this is `display: none`!
		// https://css-tricks.com/svg-sprites-use-better-icon-fonts/#article-header-id-1
		readfile(get_stylesheet_directory() . '/assets/images/sprites/symbols.svg');
	?>
