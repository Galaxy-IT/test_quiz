module.exports = () =>
  $.gulp.task('clean', () =>
    $.del([
    './build'
  ])
)
