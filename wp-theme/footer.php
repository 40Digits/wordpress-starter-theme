
	<?php wp_footer(); ?>
	<script src="<?php bloginfo('template_directory') ?>/assets/js/main.js"></script>
	<?php if(ENVIRONMENT == 'staging' || ENVIRONMENT == 'testing'){ ?>
		<script type='text/javascript'>
			(function (d, t) {
				var bh = d.createElement(t), s = d.getElementsByTagName(t)[0],
					apiKey = 'API KEY HERE';
				bh.type = 'text/javascript';
				bh.src = '//www.bugherd.com/sidebarv2.js?apikey=' + apiKey;
				s.parentNode.insertBefore(bh, s);
			})(document, 'script');
		</script>
	<?php } ?>
</body>
</html>