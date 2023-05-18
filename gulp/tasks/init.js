const config = require('../gulpfile.config');

module.exports = () =>
  $.gulp.task('init', () => {
    console.log(config);
    // $.del(['./build', './.git', './.husky', './.gulp', './.DS_Store']);
  });
