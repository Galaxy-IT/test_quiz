module.exports = () =>
  $.gulp.task('critical', ifenv() ? critical : async () => {
  });

function critical () {
  const critical = require('critical').stream;
  return new Promise(async resolve => {
    await $.gulp.src('./build/*.html')
      .pipe(critical({
        base: './build',
        css: ['./build/css/app.css'],
        inline: false,
        dimensions: [
          {
            width: 1920,
            height: 1080
          },
          {
            width: 500,
            height: 900
          }
        ]
      }))
      .pipe($.gulp.dest('./build/tmp'))
      .on('end', () => resolve(true));
  });
}
