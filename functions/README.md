# WordPress Functions

When creating functions, smaller plugins, or anything else that is related to the functions.php file, please adhere to the following standards:

* Code related to the actual site/app should be placed under `/site/`.
* Code that relates to WordPress (post types, filters, etc.) should be placed under `/wordpress/`.
* The main directory of `/functions/` shouldn't contain any files except:
  - environment.php
* Small functions which don't warrant their own file should be placed in `/wordpress/utility.php` with a short description on their functionality.

All of your functions should be included through `functions.php` located in the theme directory.

```
// Short description of your inclusion
include_once('functions/wordpress/file-name.php');
```
