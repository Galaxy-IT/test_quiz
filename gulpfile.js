const variables = require('./gulp/gulpfile.variables');
variables(global);
$.gulp.task(
  'build',
  $.gulp.series(
    'clean',
    $.gulp.parallel(
      'twig',
      'html5',
      'pug2html',
      'js',
      'json',
      'fonts:copy',
      'favicon:generate',
      'media',
      'svg',
      'htaccess'
    ),
    'styles',
    'media:tiny',
    'revision',
    'critical',
    'inject',
    'favicon:check-update',
    'favicon:markups-inject',
    // 'pwa', // TODO
    'gzip'
    // 'css-split' // TODO
  )
);

$.gulp.task('default', $.gulp.series('build', $.gulp.parallel('watch', 'serve')));
$.gulp.task('fonts', $.gulp.series('fonts:generate'));
