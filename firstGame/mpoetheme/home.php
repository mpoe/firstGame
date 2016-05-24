<?php get_header();?>
<div class="row">
    <div class="column grid_8">
        <?php
$query = new WP_Query('posts_per_page=3');
if($query->have_posts()){
    while($query->have_posts()){
        $query->the_post();
        ?>
        <section class="home column grid_12">
            <h2><a href="<?php the_permalink(); ?>"><?php the_title();?></a></h2>
            <div class="featuredImage">
                <?php
        if(has_post_thumbnail()){
                ?>
                <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail();?></a>
                <?php
        }
                ?>
            </div>
            <?php the_excerpt();?>
        </section>
        <?php
    }       
}
        ?>
    </div>
    <div class="column grid_4">
        <?php get_sidebar();?>
    </div>
</div>
<?php get_footer();?>