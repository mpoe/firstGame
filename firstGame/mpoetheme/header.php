<!doctype html>
<html lang=''>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
        <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
        <title><?php bloginfo('name'); ?></title>
        <?php wp_head();?>
    </head>
    <body>
        <div id="wrapper">
            <div id="cover">
                <img id="coverimage" src="<?php echo( get_header_image() ); ?>" alt="Header"/>
            </div>
            <?php
$menu = array(
    'container'       => 'div',
    'container_id'    => 'cssmenu',
    'menu_class'      => 'menu',
);

wp_nav_menu($menu);
            ?>