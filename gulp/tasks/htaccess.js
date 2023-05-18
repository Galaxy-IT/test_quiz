module.exports = () =>
  $.gulp.task('htaccess', () => $.gulp.src('./src/ht.access')
    .pipe(ifenv($.gp.concat('.htaccess')))
    .pipe(ifenv($.gulp.dest('./build/')))
  )
