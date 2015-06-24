<?php
	class Downloader {
		/*
			Creates a download from amn attachment ID

			Downloader::create( 1234 )
		*/
		public static function create ($item) {
			return new Download( Downloader::parse_attachment( $item ) );
		}

		/*
			Creates a download from a url

			Downloader::lookup( 'http://www.example.com/wp-content/uploads/2015/03/this-is-boring.pdf' )
		*/
		public static function lookup ($file) {
			return new Download( Downloader::parse_link( urldecode( $file ) ) );
		}

		/*
			Creates a download from a string, referencing an ACF field

			options page
				Repeater :: documents
					Text :: shortcode
					File :: document

			Downloader::global_lookup( 'shortcode name of some random file' )
		*/
		public static function global_lookup ($shortcode) {
			$shortcode = strtolower($shortcode);
			if (isset( Downloader::inst()->docs[$shortcode] ))
				return new Download( Downloader::inst()->docs[$shortcode] );
			return false;
		}


		/*
			Everything below this point is pretty straight forward, but also not important unless you plan to edit this system
		*/
		protected function __construct () {
		  if ( class_exists('acf') ) {
  			$docs = get_field('documents', 'option');
  			$this->docs = array();
  			foreach ($docs as $doc)
  				$this->docs[ strtolower( $doc[ 'shortcode' ] ) ] = $this->parse_attachment( $doc[ 'document' ] );
		  }

			return $this;
		}

		protected static function inst () {
			static $inst = null;
			if (null === $inst)
				$inst = new Downloader;
			return $inst;
		}

		public static function parse_attachment ($id) {
			$attachment = get_post($id);
			list($junk, $path) = explode( 'wp-content', $attachment->guid );
			return ABSPATH . 'wp-content' . $path;
		}

		public static function parse_link ($link) {
			list($junk, $path) = explode( 'wp-content', $link );
			return ABSPATH . 'wp-content' . $path;
		}
	}

	class Download {

		private $base_path;

		public function __construct ($location) {
			$this->location = $location;
			$this->base_path = get_template_directory_uri() . '/download.php?force-download=true&file=';
			return $this;
		}

		/*
			Retuen the download link as a string

			Downloader::create(123)->link();
		*/
		public function link () {
			return (string) ($this->base_path . $this->location);
		}

		/*
			Echo the download link
			Downloader::lookup('URL')->the_link();
		*/
		public function the_link () {
			echo $this->link();
		}

		public function download () {
			ini_set( 'memory_limit', '-1' );

			if( headers_sent() )
				die( 'Headers Sent' );

			if(ini_get( 'zlib.output_compression' ))
				ini_set('zlib.output_compression', 'Off');

			if (!is_file( $this->location ))
				die("<b>404 File not found!</b>");

			$len = filesize($this->location);
			$filename = basename($this->location);
			$file_extension = strtolower(substr(strrchr($filename,"."),1));

			switch( $file_extension ) {
				case "pdf"  : $ctype="application/pdf"; break;
				case "exe"  : $ctype="application/octet-stream"; break;
				case "zip"  : $ctype="application/zip"; break;
				case "doc"  : $ctype="application/msword"; break;
				case "xls"  : $ctype="application/vnd.ms-excel"; break;
				case "ppt"  : $ctype="application/vnd.ms-powerpoint"; break;
				case ".docx": $ctype="application/vnd.openxmlformats-officedocument.wordprocessingml.document"; break;
				case ".pptx": $ctype="application/vnd.openxmlformats-officedocument.presentationml.presentation"; break;
				case ".xlsx": $ctype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; break;
				case "gif"  : $ctype="image/gif"; break;
				case "png"  : $ctype="image/png"; break;
				case "jpeg" :
				case "jpg"  : $ctype="image/jpg"; break;
				case "mp3"  : $ctype="audio/mpeg"; break;
				case "wav"  : $ctype="audio/x-wav"; break;
				case "mpeg" :
				case "mpg"  :
				case "mpe"  : $ctype="video/mpeg"; break;
				case "mov"  : $ctype="video/quicktime"; break;
				case "avi"  : $ctype="video/x-msvideo"; break;
				case "mp4"  : $ctype="video/mpeg"; break;

				//The following are for extensions that shouldn't be downloaded
				case "php"  :
				case "css"  :
				case "js"   :
				case "htm"  :
				case "html" :
				case "txt"  : die("<b>Cannot be used for ". $file_extension ." files!</b>"); break;

				default     : $ctype="application/force-download";
			}

			header( "Pragma: public" );
			header( "Expires: 0" );
			header( "Cache-Control: must-revalidate, post-check=0, pre-check=0" );
			header( "Cache-Control: public" );
			header( "Content-Description: File Transfer" );
			header( "Content-Type: $ctype" );
			$header="Content-Disposition: attachment; filename=".$filename.";";
			header( $header );
			header( "Content-Transfer-Encoding: binary" );
			header( "Content-Length: " . $len );
			echo file_get_contents( $this->location );
			exit;
		}

	}

	// catch the download url and run the download
	if (isset($_GET['force-download']) && 'true' == $_GET['force-download'])
		Downloader::lookup( $_GET['file'] )->download();