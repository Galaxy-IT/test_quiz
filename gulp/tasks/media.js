module.exports = () => {
  $.gulp.task('media', () => {
    let media_video = $.gulp
      .src('./src/web/video/**/*.*')
      .pipe($.gp.changed('./build/video/'))
      .pipe($.gulp.dest('./build/video/'));

    let media_music = $.gulp
      .src('./src/web/music/**/*.*')
      .pipe($.gp.changed('./build/music/'))
      .pipe($.gulp.dest('./build/music/'));

    let media_pdf = $.gulp
      .src('./src/web/docs/**/*.*')
      .pipe($.gp.changed('./build/docs/'))
      .pipe($.gulp.dest('./build/docs/'));

    let media_img = $.gulp
      .src(`./src/web/img/**/*.${img_format}`)
      .pipe($.gp.changed('./build/img/'))
      .pipe(ifenv($.gp.image()))
      .pipe($.gulp.dest('./build/img/'));

    let media_webp = $.gulp
      .src(`./src/web/img/**/*.${img_format}`)
      .pipe($.gp.webp({ quality: 90 }))
      .pipe($.gulp.dest('./build/img/'));

    // TODO
    // let media_pwa = $.gulp
    //   .src(`./src/web/img/pwa/*.${img_format}`)
    //   .pipe($.gp.changed('./build/img/'))
    //   .pipe($.gulp.dest('./build/img/pwa/'));

    return $.merge(media_video, media_music, media_pdf, media_webp, media_img);
  });

  $.gulp.task('media:tiny', ifenv() ? tiny_png : async () => {});
};

function tiny_png() {
  return new Promise(async (resolve) => {
    await $.gulp
      .src(`./build/img/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}`)
      .pipe(ifenv($.gp.tinypng(tiny_png_key)))
      .pipe(ifenv($.gulp.dest('./build/img/')))
      .on('end', () => resolve(true));
  });
}
