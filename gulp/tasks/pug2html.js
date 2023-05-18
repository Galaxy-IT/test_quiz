module.exports = () => $.gulp.task('pug2html', pug && convert_pug_to_html ? pug2html : async () => {});

function pug2html() {
  const pugBem = require('gulp-pugbem');

  $.del(['./src/view/html/**/*.html']);

  return $.gulp
    .src(['./src/view/pug/**/*.pug', '!**/**/main.pug', '!**/**/mixins.pug'])
    .pipe($.gp.data({ rmDevMenu: true }))
    .pipe(
      $.gp.pug({
        plugins: [pugBem],
        pretty: true
      })
    )
    .pipe($.gulp.dest('./src/view/html/'));
  // .pipe($.gp.git.add());
}
