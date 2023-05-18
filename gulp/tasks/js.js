const GulpWebpack = require('webpack-stream');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
module.exports = webpack ? web_pack : gulp;

function web_pack() {
  const config = require('../../webpack.config');
  const webpack = require('webpack');

  $.gulp.task('js', () =>
    $.gulp
      .src('src/assets/js/*.js')
      .pipe($.gp.sourcemaps.init())
      .pipe(GulpWebpack(config(prod), webpack))
      .pipe(ifenv($.gp.stripComments()))
      .pipe($.gp.concat('app.js'))
      .pipe($.gulp.dest('./build/js/'))
      .pipe($.gp.concat('app.min.js'))
      .pipe($.gp.sourcemaps.write('../maps'))
      .pipe($.gulp.dest('./build/js/'))
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

function gulp() {
  $.gulp.task('js', () => {
    const js = () => {
      return browserify('./src/assets/js/main.js')
        .transform('babelify', { presets: ['@babel/preset-env'] })
        .bundle()
        .on('error', function browserify(error) {
          console.log(error.stack);
          this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe($.gp.sourcemaps.init())
        .pipe($.gulp.dest('./build/js/'))
        .pipe($.gp.uglify())
        .pipe($.gp.rename('main.min.js'))
        .pipe($.gp.sourcemaps.write('../maps'))
        .pipe($.gulp.dest('./build/js/'))
        .pipe(
          ifenv(
            $.browserSync.reload({
              stream: true
            }),
            'development'
          )
        );
    };

    let js_libs = $.gulp
      .src(require('../libs'))
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.concat('app.js'))
      .pipe($.gulp.dest('./build/js/'))
      .pipe(ifenv($.gp.terser()))
      .pipe(ifenv($.gp.stripComments()))
      .pipe($.gp.uglify())
      .pipe($.gp.concat('app.min.js'))
      .pipe($.gp.sourcemaps.write('../maps'))
      .pipe($.gulp.dest('./build/js/'))
      .pipe(
        ifenv(
          $.browserSync.reload({
            stream: true
          }),
          'development'
        )
      );

    return $.merge(js_libs, js());

    // let js = $.gulp
    // .src('./src/assets/js/main.js')
    // .pipe($.gp.sourcemaps.init())

    // let js = $.gulp.src('./src/assets/js/**/*.js')
    // .pipe($.gp.eslint())
    // .pipe($.gp.eslint.format())
    // .pipe($.gp.babel())
    // .pipe($.gp.concat('main.js'))
    // .pipe($.gulp.dest('./build/js/'))
    // .pipe(ifenv($.gp.terser()))
    // .pipe(ifenv($.gp.stripComments()))
    // .pipe($.gp.concat('main.min.js'))
    // .pipe($.gp.sourcemaps.write('../maps'))
    // .pipe($.gulp.dest('./build/js/'))
    // .pipe(
    //   ifenv(
    //     $.browserSync.reload({
    //       stream: true
    //     }),
    //     'development'
    //   )
    // );

    // let js_libs = $.gulp
    //   .src(require('../libs'))
    //   .pipe($.gp.sourcemaps.init())
    //   .pipe($.gp.concat('app.js'))
    //   .pipe($.gulp.dest('./build/js/'))
    //   .pipe(ifenv($.gp.terser()))
    //   .pipe(ifenv($.gp.stripComments()))
    //   .pipe($.gp.concat('app.min.js'))
    //   .pipe($.gp.sourcemaps.write('../maps'))
    //   .pipe($.gulp.dest('./build/js/'))
    //   .pipe(
    //     ifenv(
    //       $.browserSync.reload({
    //         stream: true
    //       }),
    //       'development'
    //     )
    //   );
    // return $.merge(js_libs, js());
    // return js();
  });
}

// =================== Webpack stream
// function gulp() {
//   const GulpWebpack = require('webpack-stream');

//   $.gulp.task('js', () => {
//     return $.gulp
//       .src('./src/assets/js/main.js')
//       .pipe(
//         GulpWebpack({
//           entry: './src/assets/js/main.js',
//           mode: 'development',
//           devtool: 'source-map',
//           output: {
//             filename: 'main.min.js'
//           },
//           optimization: {
//             minimize: ifenv() ? true : false
//           },
//           module: {
//             rules: [
//               {
//                 test: /\.js$/,
//                 use: {
//                   loader: 'babel-loader',
//                   query: { compact: false }
//                   // options: {
//                   //   presets: ['@babel/preset-env'],
//                   //   plugins: ['@babel/plugin-proposal-object-rest-spread']
//                   // }
//                 }
//               }
//             ]
//           }
//         })
//       )
//       .pipe($.gulp.dest('./build/js/'))
//       .pipe(
//         ifenv(
//           $.browserSync.reload({
//             stream: true
//           }),
//           'development'
//         )
//       );
//   });
// }
