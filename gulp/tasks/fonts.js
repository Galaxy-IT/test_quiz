const ttf2svg = require('gulp-ttf-svg');

const copyFonts = () => $.gulp.src('./src/assets/fonts/*.*').pipe($.gulp.dest('./build/fonts/'));

const generateFonts = () =>
  $.gulp
    .src('./src/assets/fonts/*.ttf')
    .pipe($.gulp.dest('./src/assets/fonts/'))
    .pipe($.gulp.src('./src/assets/fonts/*.ttf'))
    .pipe(ttf2svg())
    .pipe($.gulp.dest('./src/assets/fonts/'))
    .pipe($.gulp.src('./src/assets/fonts/*.ttf'))
    .pipe($.gp.ttf2eot())
    .pipe($.gulp.dest('./src/assets/fonts/'))
    .pipe($.gulp.src('./src/assets/fonts/*.ttf'))
    .pipe($.gp.ttf2woff())
    .pipe($.gulp.dest('./src/assets/fonts/'))
    .pipe($.gulp.src('./src/assets/fonts/*.ttf'))
    .pipe($.gp.ttf2woff2())
    .pipe($.gulp.dest('./src/assets/fonts/'))
    .pipe($.gulp.src('./src/assets/fonts/*.ttf'))
    .pipe($.gulp.dest('./src/assets/fonts/'));

module.exports = () => {
  $.gulp.task('fonts:generate', generateFonts);
  $.gulp.task('fonts:copy', copyFonts);
};
