module.exports = () =>
  $.gulp.task('watch', () => {
    $.gulp.watch('./src/view/{pug,html}/pages/*.{pug, html}', $.gulp.series('inject'));
    $.gulp.watch('./src/view/**/*.{pug, html}', $.gulp.series('html5', 'favicon:markups-inject'));
    $.gulp.watch('./src/view/**/*.twig', $.gulp.series('twig', 'favicon:markups-inject'));

    $.gulp.watch('./src/json/*.json', $.gulp.series('html5', 'twig'));

    $.gulp.watch(`./src/assets/${css}/**/*.${style_formats}`, $.gulp.series('styles'));
    $.gulp.watch('./src/assets/js/**/*.js', $.gulp.series('js'));

    $.gulp.watch('./src/assets/{icon,svg}/*.svg', $.gulp.series('svg'));

    $.gulp.watch(
      ['./src/web/video/**/*.*', './src/web/music/**/*.*', './src/web/docs/**/*.*', `./src/web/img/**/*.${img_format}`],
      $.gulp.series('media')
    );
  });
