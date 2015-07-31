# Theme Partials

Please make sure to break down your larger theme files into smaller partial components.

Your partials should be broken down into respective folders, with individual files named `name-of-partial.php`

If you need a module-like area for repeated code throughout your site, use a `global` folder.

You should pull all partial assets with:

```
<?php include(get_stylesheet_directory() . '/partials/template-name/name-of-partial.php'); ?>
```

...Or use a really handy utility method that looks much nicer and requires less typing :thumbsup:. Don't include the extension, and begin building the path starting in the `partials` directory. So something like this:

```
<?php include(get_partial_path('template-name/name-of-partial')); ?>
```

Would be equivalent to doing:

```
<?php include(get_stylesheet_directory() . '/partials/template-name/name-of-partial.php'); ?>
```

Or if you're really fancy, you can use dot notation (which just looks nicer, doesn't it?):

```
<?php include(get_partial_path('template-name.name-of-partial')); ?>
```

This is also equivalent to the previous example.

If for some reason your partial has a different extension or you have a different partial directory, pass in those parameters:

```
<?php include(get_partial_path('name-of-partial', 'alternative-partials-base-directory')); ?>
```

```
<?php include(get_partial_path('name-of-partial', 'partials', 'html')); ?>
```
