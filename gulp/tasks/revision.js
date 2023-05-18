module.exports = () => {
  $.gulp.task('revision', ifenv() ? revision : async () => {});
};

function revision() {
  return new Promise(async (resolve) => {
    await $.gulp
      .src('./build/**/*.min.{js,css}')
      .pipe($.gp.rev())
      .pipe($.gp.revDeleteOriginal())
      .pipe($.gulp.src('./build/**/*.html'))
      .pipe($.gp.revRewrite())
      .pipe($.gulp.dest('./build'))
      .on('end', () => resolve(true));
  });
}
