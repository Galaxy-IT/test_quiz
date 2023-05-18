module.exports = css === 'scss' ? scss : styl;

const plugins = [
  require('autoprefixer')
];
function scss () {
  const sass = require('gulp-sass')(require('sass'));

  $.gulp.task('styles', () => {
      const styles = $.gulp.src('./src/assets/scss/main.scss')
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.sassVariables({
          $ViewPort: ViewPort
        }))
        .pipe(sass({
          includePaths: [
            'node_modules'
          ],
          errLogToConsole: true
        }))
        .pipe($.gp.postcss(plugins))
        .pipe(ifenv($.gp.plumber(), 'development'))
        .pipe($.gp.concat('app.css'))
        .pipe($.gulp.dest('./build/css/'))
        .pipe(ifenv($.gp.csscomb()))
        .pipe(ifenv($.gp.postcss()))
        .pipe($.gp.concat('app.min.css'))
        .pipe($.gp.sourcemaps.write('../maps'))
        .pipe($.gulp.dest('./build/css/'))
        .pipe(ifenv($.browserSync.reload({
          stream: true
        }), 'development'));

      if (tailwind) {
        const purge = $.gulp.src('./src/assets/scss/tailwind.scss')
          .pipe($.gp.sourcemaps.init())
          .pipe(ifenv($.gp.postcss()))
          .pipe($.gp.concat('tailwind.css'))
          .pipe($.gulp.dest('./build/css/'))
          .pipe($.gp.concat('tailwind.min.css'))
          .pipe($.gp.sourcemaps.write('../maps'))
          .pipe($.gulp.dest('./build/css/'));

        return $.merge(styles, purge);
      } else {
        return styles;
      }
    }
  );
}

function styl () {
  $.gulp.task('styles', () => $.gulp.src('./src/assets/styl/main.styl')
    .pipe($.gp.sourcemaps.init())
    .pipe($.gp.stylus({
      'include css': true,
      include: [
        'css',
        './'
      ]
    }))
    .on('error', $.gp.notify.onError(function(error) {
      return {
        title: 'Stylus',
        message: error.message
      };
    }))
    .pipe($.gp.postcss(plugins))
    .pipe($.gp.concat('app.css'))
    .pipe($.gulp.dest('./build/css/'))
    .pipe(ifenv($.gp.csscomb()))
    .pipe(ifenv($.gp.postcss()))
    .pipe($.gp.concat('app.min.css'))
    .pipe($.gp.sourcemaps.write('../maps'))
    .pipe($.gulp.dest('./build/css/'))
    .pipe(ifenv($.browserSync.reload({
      stream: true
    }), 'development'))
  );
}
