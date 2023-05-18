module.exports = () =>
  $.gulp.task('svg', () => {
    let svg_sprite = $.gulp.src('./src/assets/icon/*.svg')
      .pipe($.gp.changed('./build/icon/'))
      .pipe($.gp.svgmin({
        cwd: './gulp'
      }))
      .pipe($.gp.cheerio({
        run: ($) => {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      // .pipe($.gp.svgstore())
      .pipe($.gp.svgSprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
            example: true,
          },
        },
      }))
      .pipe($.gulp.dest('./build/icon/'))

    let svg = $.gulp.src('./src/assets/svg/*.svg')
      .pipe($.gp.changed('./build/svg/'))
      .pipe($.gp.svgmin())
      .pipe($.gulp.dest('./build/svg/'))

    return $.merge(svg_sprite, svg)
  })
