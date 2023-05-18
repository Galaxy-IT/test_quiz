module.exports = () =>
  $.gulp.task('json', () => $.gulp.src('./src/json/*.json')
    .pipe(ifenv($.browserSync.reload({
      stream: true
    }), 'development'))
  );
