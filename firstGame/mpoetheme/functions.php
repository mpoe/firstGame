<?php
//Tell wordpress that my theme supports editing menus and has featured images
function custom_theme_setup() {
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
    add_theme_support('custom-header');
}

//Tells wordpress to add our custom theme v
add_action('after_setup_theme', 'custom_theme_setup');

function mpoethemev420_setupSidebars(){
    if(function_exists('register_sidebar')){
        register_sidebar(array(
            'name'          => 'Sidebar',
            'id'            => 'sidebar',
            'before_widget' => '',
            'after_widget'  => '',
            'before_title'  => '<h3>',
            'after_title'   => '</h3>'
        ));
    }
}
add_action('widgets_init','mpoethemev420_setupSidebars');