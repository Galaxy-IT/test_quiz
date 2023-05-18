module.exports = () => {
  $.gulp.task('favicon:generate', ifenv() ? generate_build : generate_dev);

  $.gulp.task('favicon:check-update', ifenv() ? check_update : async () => {});

  $.gulp.task('favicon:markups-inject', markups_inject);
};

function generate_dev() {
  return $.gulp
    .src('./src/assets/favicon/**/*.*')
    .pipe($.gp.changed('./build/favicon/'))
    .pipe($.gulp.dest('./build/favicon/'));
}

function generate_build(done) {
  $.gp.realFavicon.generateFavicon(
    {
      masterPicture: './src/assets/favicon/favicon.png',
      dest: './build/favicon/',
      iconsPath: 'favicon/',
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {
          design: 'raw'
        },
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#da532c',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#ffffff',
          manifest: {
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        }
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false
      },
      markupFile: faviconData
    },
    function () {
      done();
    }
  );
}

function check_update() {
  return new Promise(async (resolve) => {
    const currentVersion = JSON.parse($.fs.readFileSync(faviconData)).version;
    await $.gp.realFavicon.checkForUpdates(currentVersion, function (err) {
      resolve(true);
      if (err) {
        throw err;
      }
    });
  });
}

function markups_inject() {
  return new Promise(async (resolve) => {
    await $.gulp
      .src(['./build/*.html'])
      .pipe(ifenv($.gp.realFavicon.injectFaviconMarkups(JSON.parse($.fs.readFileSync(faviconData)).favicon.html_code)))
      .pipe(
        ifenv(
          $.gp.realFavicon.injectFaviconMarkups(
            '<link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon.png">\n'
          ),
          'development'
        )
      )
      .pipe(ifenv($.gp.htmlmin({ collapseWhitespace: true })))
      .pipe($.gulp.dest('./build'))
      .on('end', () => resolve(true));
  });
}
