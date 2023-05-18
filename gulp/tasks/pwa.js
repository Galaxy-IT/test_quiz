const Config = require('pwa-config');

const _config = new Config({
  srcDir: 'img/pwa',
  name: 'Galaxy PPC',
  short_name: 'PPC',
  theme_color: '#B458EC',
  display: 'fullscreen',
  background_color: '#88BCF9',
  start_url: '.'
});

module.exports = () => {
  $.gulp.task('pwa', () => {
    $.gulp
      .src('build/**/*.html')
      .pipe(
        $.gp.modifyFile((content, path, file) => {
          return content.replace(/<!-- pwa config tags-->/, `${_config.tags}`);
        })
      )
      .pipe($.gulp.dest('./build'));

    return $.gulp
      .src('src/assets/manifest.json')
      .pipe($.gp.modifyFile(() => `${JSON.stringify(_config.manifest)}`))
      .pipe($.gulp.dest('./build'));
  });
};
