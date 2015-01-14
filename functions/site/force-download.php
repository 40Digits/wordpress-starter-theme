<?php

	if (empty($_GET['file'])) {
		echo 'Error: File path is incorrect.';
		exit;
	}

	$file = $_GET['file'];

	$file_headers = array_change_key_case(@get_headers($file, 1), CASE_LOWER);
	if($file_headers[0] == 'HTTP/1.1 404 Not Found') {
		echo 'Error: File was not found.';
		exit;
	}

	$extension = strtolower(substr(strrchr($file, "."), 1));
	switch($extension) {
		case "pdf": $ctype = "application/pdf"; break;
		case "exe": $ctype = "application/octet-stream"; break;
		case "zip": $ctype = "application/zip"; break;
		case "rar": $ctype = "application/rar"; break;
		case "doc": $ctype = "application/msword"; break;
		case "xls": $ctype = "application/vnd.ms-excel"; break;
		case "ppt": $ctype = "application/vnd.ms-powerpoint"; break;
		case "mp4": $ctype = "video/mp4"; break;
		case "gif": $ctype = "image/gif"; break;
		case "png": $ctype = "image/png"; break;
		case "jpeg":
		case "jpg": $ctype = "image/jpg"; break;
		default: $ctype = "application/force-download";
	}

	header("Content-Description: File Transfer");
	header("Content-Type: " . $ctype);
	header("Content-Disposition: attachment; filename=" . basename($file));
	header("Content-Transfer-Encoding: binary");
	header("Expires: 0");
	header("Cache-Control: must-revalidate");
	header("Pragma: public");
	header("Content-Length: " . $file_headers['content-length']);

	ob_clean();
	flush();

	readfile($file);

	exit();

?>