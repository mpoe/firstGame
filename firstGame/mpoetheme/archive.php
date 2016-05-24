<?php get_header();?>
<div class="dynamic">
    <?php
if(have_posts()){
    while(have_posts()){
        the_post();
    ?>
    <div class="post">
        <h2>
            <a href="<?php the_permalink(); ?>"><?php the_title()?></a>
        </h2>
        <?php
        the_excerpt();
        ?>
            <?php
        if(has_post_thumbnail()){
            ?>
            <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail();?></a>
            <?php
        }
            ?>
    </div>
    <?php
    }
    the_posts_pagination();
}
    ?>
</div>
<?php get_footer();?>