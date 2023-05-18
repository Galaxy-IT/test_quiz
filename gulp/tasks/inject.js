module.exports = () =>
  $.gulp.task('inject', async () => {
      let filename = [];
      const inject = $.gulp.src('./build/**/*.html')
        .pipe(ifenv($.gp.inject($.gulp.src('./src/assets/fonts/*.woff2', {read: false }), {
          starttag: '<!-- inject:font preload -->',
          endtag: '<!-- endinject -->',
          transform: (filepath) => '<link rel=\'preload\' href=\'fonts/' + (filepath.match(/[^\\/]+\.[^\\/]+$/)[0]) + '\' as=\'font\' type=\'font/woff2\' crossorigin=\'\' />'
        })))
        .pipe(ifenv($.gp.inject($.gulp.src(`./build/tmp/*.css`, {read: false }), {
          starttag: '<!-- inject:critical -->',
          endtag: '<!-- endinject -->',
          transform: (filepath, file, index, length, targetFile) => {
            if(filename.indexOf(targetFile.stem) < 0 && file.stem === targetFile.stem) {
              filename.push(targetFile.stem)
              return '<link rel=\'stylesheet\' href=\'tmp/'+ targetFile.stem +'.css\' >'
            }
          }
        })))
        .pipe(ifenv($.gulp.dest('./build')));

      const global_menu = $.gulp.src('./src/auto/menuGlobal.json')
        .pipe(ifenv($.gp.inject($.gulp.src('./build/**/*.html'), {
          starttag: '{"menuLink": {',
          endtag: '}}',
          // transform: function(filepath, file, i, length) {
          //   let file_name = (filepath.match(/[^\\/]+\.[^\\/]+$/)[0]).split('.')[0];
          //   return '"' + (i + 1) + '.' + file_name + '": "' + file_name + '.html"' + (i + 1 < length ? ',' : '');
          // }
          transform: function(filepath, file, i, length) {
            let filepaths = filepath.replace(/build(\/)/, '');
            let file_name = (filepath.match(/[^\\/]+\.[^\\/]+$/)[0]).split('.')[0];
            return '"' + (i + 1) + '.' + file_name + '": "' + '.' +filepaths + '"' + (i + 1 < length ? ',' : '');
          }
        }), 'development'))
        .pipe(ifenv($.gulp.dest('./src/auto/'), 'development'));

      $.merge(global_menu, inject);
    }
  );
