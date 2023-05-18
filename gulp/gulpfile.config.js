module.exports = {
  css: 'scss', // ONLY scss || styl
  twig: true, // default | true
  pug: false, // default | true
  convert_pug_to_html: false, // auto convert pug to html in src/html folder default | false
  webpack: false, // default | false
  tailwind: false, // default | false
  ViewPort: false, // default | false
  tiny_png_key: 'kYJPXhGXHGh8FjcMB2WFqvggRrkTt9Jt', // https://tinypng.com/developers
  img_format: '{png,jpg,jpeg,gif,PNG,JPG,JPEG,GIF}', // for WebP convert && build move
  style_formats: '{styl,stylus,scss,sass,less}',
  faviconData: './src/auto/favicon.json'
};
