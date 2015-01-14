<!DOCTYPE html>
<!--[if lte IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js"><!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#ee7421">

	<title><?php wp_title('&raquo;','true','right'); ?></title>

	<link rel="shortcut icon" type="image/ico" href="<?php bloginfo('template_directory') ?>/favicon.ico" />
	<link rel="apple-touch-icon" href="<?php bloginfo('template_directory') ?>/assets/images/favicon/touch-60.png">
	<link rel="apple-touch-icon" sizes="76x76" href="<?php bloginfo('template_directory') ?>/assets/images/favicon/touch-76.png">
	<link rel="apple-touch-icon" sizes="120x120" href="<?php bloginfo('template_directory') ?>/assets/images/favicon/touch-120.png">
	<link rel="apple-touch-icon" sizes="152x152" href="<?php bloginfo('template_directory') ?>/assets/images/favicon/touch-152.png">

	<link rel="stylesheet" href="<?php bloginfo('template_directory') ?>/style.css" />

	<script>
		// Place Google Analytics code here

		// Set up site configuration
		window.config = window.config || {};

		// The base URL for the WordPress theme
		window.config.baseUrl = "<?php bloginfo('url')?>";

		// Empty default Gravity Forms spinner function
		var gformInitSpinner = function() {};
	</script>

	<script src="<?php bloginfo('template_directory') ?>/assets/js/vendor/modernizr.js"></script>
	<?php wp_head();?>

</head>
<body <?php body_class(); ?>  id="<?php echo get_template_name(); ?>">