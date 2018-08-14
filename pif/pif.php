<?php
  /*
     Plugin Name: PIF Calculator
     Description: PensionCalculator in ReactJS
     Version: 0.1
     Author: Ruben Pauwels, Flux
     Author URI: https://flux.be
     License: MIT
  */

  function pif() {
    return '<div id="root"></div>';
  }

//-----------------------------------------------------

add_shortcode( 'react-init', 'pif' );

  function include_react_files() {
    wp_enqueue_style( 'prefix-style', plugins_url('css/main.5c9acdad.css', __FILE__) );
    wp_enqueue_script( 'plugin-scripts', plugins_url('js/main.813614aa.js', __FILE__),array(),  '0.0.2', true );
  }

  add_action( 'wp_enqueue_scripts', 'include_react_files' );
