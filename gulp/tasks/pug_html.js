module.exports = () => $.gulp.task('html5', pug ? pug_template : async () => {});

function pug_template() {
  const pugBem = require('gulp-pugbem');
  // const path = require('path');
  // console.log(path.join(__dirname));

  return (
    $.gulp
      .src(['./src/view/pug/home/*.pug', './src/view/pug/pages/*.pug', './src/view/pug/errors/*.pug'])
      .pipe(ifenv($.gp.plumber(), 'development'))
      .pipe($.gp.pugLinter({ report: 'default' }))
      .pipe(
        $.gp.pug({
          plugins: [pugBem],
          pretty: !prod
        })
      )
      // .pipe($.gp.htmlBemValidator())
      .on(
        'error',
        $.gp.notify.onError((error) => {
          return {
            title: 'Pug',
            message: error
          };
        })
      )
      .pipe(ifenv($.gp.htmlmin({ collapseWhitespace: true })))
      .pipe($.gulp.dest('./build/'))
      .pipe(
        ifenv(
          $.browserSync.reload({
            stream: true
          }),
          'development'
        )
      )
  );
}

function html_template() {
  const { quotes, sectionSigns, shortWords } = require('richtypo-rules-ru');

  return $.gulp
    .src('src/view/html/pages/*.html')
    .pipe(
      $.gp.posthtml([
        require('posthtml-include')(),
        require('posthtml-expressions')(),
        require('posthtml-richtypo')({
          attribute: 'data-typo',
          rules: [quotes, sectionSigns, shortWords]
        })
      ])
    )
    .pipe(ifenv($.gp.htmlmin({ collapseWhitespace: true })))
    .pipe($.gulp.dest('./build/'))
    .pipe(
      ifenv(
        $.browserSync.reload({
          stream: true
        }),
        'development'
      )
    );
}
