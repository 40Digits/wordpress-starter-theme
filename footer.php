
	<?php wp_footer(); ?>

	<?php if ( WP_ENV != 'production' ) : ?>
		<div style="position:fixed;right:0;bottom:0;padding:5px;background:#fff;z-index:99999;"><?php echo get_num_queries(); ?></div>
		<script type='text/javascript'>
			(function (d, t) {
				var bh = d.createElement(t), s = d.getElementsByTagName(t)[0],
					apiKey = 'API KEY HERE';
				bh.type = 'text/javascript';
				bh.src = '//www.bugherd.com/sidebarv2.js?apikey=' + apiKey;
				s.parentNode.insertBefore(bh, s);
			})(document, 'script');
		</script>
	<?php endif; ?>

</body>
</html>