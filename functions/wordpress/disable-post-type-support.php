<?php

//---------------------------------
// Disable PT support on templates
//---------------------------------

add_action( 'admin_init', 'hide_editor' );
function hide_editor() {

  // Get the Post ID.
  if ( isset ( $_GET['post'] ) )
    $post_id = $_GET['post'];
  else if ( isset ( $_POST['post_ID'] ) )
    $post_id = $_POST['post_ID'];

  if( !isset ( $post_id ) || empty ( $post_id ) )
    return;

  // Get the name of the Page Template file.
  $template_file = get_post_meta($post_id, '_wp_page_template', true);

  // unsupported editor templates
  $unsupported_templates = array(
    'templates/template-one.php',
    'templates/template-two.php'
  );

  if( in_array($template_file, $unsupported_templates) ){
    remove_post_type_support('page', 'editor');
  }

}