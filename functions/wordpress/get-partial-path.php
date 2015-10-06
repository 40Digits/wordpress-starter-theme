<?php

// This function gets the path to a partial based on keeping the `partials` standard
// Allows for use of dot notation, i.e. get_partial_path('sub-dir.component') would return something like `[...]theme/partials/sub-dir/component.php`
// Please see [...]/theme/partials/README.md for more examples on usage
if (!function_exists('get_partial_path')) {
	function get_partial_path($name, $partials_base_dir = 'partials', $extension = 'php') {
		// Replace periods in the name with the directory separator if the developer used dot notation
		$name = str_replace('.', DIRECTORY_SEPARATOR, $name);

		// By default, it should just be the extension without the period
		// If the period was included by accident, remove it
		if ($extension[0] === '.')
			$extension = substr($extension, 1);

		return join_paths(get_template_directory(), $partials_base_dir, $name . '.' . $extension);
	}
}

// This function normalizes a filepath, taken from
// http://stackoverflow.com/questions/1091107/how-to-join-filesystem-path-strings-in-php#answer-15575293
if (!function_exists('join_paths')) {
	function join_paths() {
		$paths = array();

		foreach (func_get_args() as $arg) {
			$arg = trim($arg);

			if ($arg !== '')
				$paths[] = $arg;
		}

		return preg_replace('#' . DIRECTORY_SEPARATOR . '+#', DIRECTORY_SEPARATOR, join(DIRECTORY_SEPARATOR, $paths));
	}
}