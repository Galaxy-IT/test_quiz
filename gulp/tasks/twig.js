const path = require('path');

module.exports = () => $.gulp.task('twig', twig ? twig_template : () => {
});

function twig_template() {
  const throwCurrentPage = ({path: filePath}) => {
    const fileBaseName = path.basename(filePath);
    const extNameRegExp = new RegExp(path.extname(filePath));
    const currentPage = fileBaseName.replace(extNameRegExp, '');

    return {currentPage};
  };

  const functions = [
    {
      name: 'json',
      func: function (fileName) {
        return require(path.join(__dirname, '..', '..', 'src', 'json', `${fileName}.json`));
      }
    },
    {
      name: 'auto',
      func: function (fileName) {
        return require(path.join(__dirname, `../../src/auto/${fileName}.json`));
      }
    },
    {
      name: 'toLowerCase',
      func: function (string) {
        if (typeof string === 'string') {
          return string.toLowerCase();
        } else {
          console.log(`Value '${string} has to be string type, not ${typeof string}'`);
        }
      }
    },
    {
      name: 'replace',
      func: function (string, regExp, newValue = '', RegExpFlags = []) {
        const newRegExp = new RegExp(regExp, ...RegExpFlags);

        return string.replace(newRegExp, newValue);
      }
    }
  ];

  return $.gulp
    .src(['./src/view/twig/home/*.twig', './src/view/twig/pages/*.twig', './src/view/twig/errors/*.twig'])
    .pipe(ifenv($.gp.plumber(), 'development'))
    .pipe($.gp.data(throwCurrentPage))
    .pipe($.gp.twig({functions, data: {prod, webpack}}))
    .on(
      'error',
      $.gp.notify.onError((error) => {
        return {
          title: 'Twig',
          message: error
        };
      })
    )
    .pipe(ifenv($.gp.htmlmin({collapseWhitespace: true})))
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
