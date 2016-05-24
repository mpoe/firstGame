<?php get_header();?>

<!-- middle content area -->
<div class="row">
    <!-- WordPress Loop -->
    <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
    <div class="blogpost column grid_8">
        <h3 class="entrytitle" id="post-<?php the_ID(); ?>"> <?php the_title(); ?></h3>
        <?php the_content(); ?>
    </div>
    <?php endwhile; ?>
    <?php else : ?>
    <h6 class="center">Not Found</h6>
    <p class="center">Sorry, but you are looking for something that isn't here.</p>
    <?php include (TEMPLATEPATH . "/searchform.php"); ?>
    <?php endif; ?>
    <!-- End WordPress Loop -->
    <div class="column grid_4">
        <?php get_sidebar();?>
    </div>
</div>
<!-- end middle content area -->
<?php get_footer();?>