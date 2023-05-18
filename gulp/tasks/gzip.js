module.exports = () =>
  $.gulp.task('gzip', ifenv() ? gzip : async () => {
  });

function gzip () {
  return new Promise(async resolve => {
    await $.gulp.src('./build/**/*.min.{css,js}')
      .pipe(ifenv($.gp.zopfliGreen()))
      .pipe(ifenv($.gulp.dest('./build/')))
      .on('end', () => resolve(true));
  });
}
