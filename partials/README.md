# Theme Partials

Please make sure to break down your larger theme files into smaller partial components.

Your partials should be broken down into respective folders, with individual files named `name.partial.php`

You should pull all partial assets with:

```
<?php include(get_template_directory() . '/partials/partial-folder/name.partial.php'); ?>
```