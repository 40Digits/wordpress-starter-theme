# Theme Partials

Please make sure to break down your larger theme files into smaller partial components.

Your partials should be broken down into respective folders, with individual files named `partial-name.php`

You should pull all partial assets with:

```
<?php include(get_template_directory() . '/partials/template-name/partial-name.php'); ?>
```

If you need a module-like area for repeated code throughout your site, use a `global` folder.