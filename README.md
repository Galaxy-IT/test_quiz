`https://www.conventionalcommits.org/en/v1.0.0/#specification
npx husky install && npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'`

read more [here](https://blog.logrocket.com/commitlint-write-more-organized-code/)

Follow these steps to run the template

1. `npm i`
2. `gulp` or `npm start`

`npm install -g npm-upgrade`

`npm-upgrade`

WebP usage:

The assembler includes WebP support. WebP is a graphics format developed by Google in 2010. It was created as an alternative to PNG and JPG and differs from them in a much smaller size with the same image quality.

Usage in `pug`

```
picture
  source(media="(min-width:992px)" srcset='web/img/general/pic_webp.webp', type='image/webp')
  source(media="(min-width:575px)" srcset='web/img/general/pic_webp.webp', type='image/webp')
  source(srcset='web/img/general/pic_webp.webp', type='image/webp')
  img(src='web/img/general/pic_webp.png', alt='img')
```

Usage in `stylus`

```
.css-img
  size(300px, 200px)
  background: url("../img/general/pic_webp.webp") no-repeat;
  background-size: cover;

@media not all and (min-resolution:.001dpcm) // FOR SAFARI 10+
  .css-img
    size(300px, 200px)
    background: url("../img/general/pic_webp.png") no-repeat;
    background-size: contain;

@supports (-ms-ime-align:auto) // FOR EDGE
  .css-img
    size(300px, 200px)
    background: url("../img/general/pic_webp.png") no-repeat;
    background-size: contain;

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)  // FOR IE 10+
  .css-img
    size(300px, 200px)
    background: url("../img/general/pic_webp.png") no-repeat;
    background-size: contain;

@media only screen and (min-resolution: 110dpi)
       and (max-resolution: 190dpi) and (max-width: 1600px),
       not (-webkit-min-device-pixel-ratio: 1.5),
       not (min--moz-device-pixel-ratio: 1.5),
       not (-o-min-device-pixel-ratio: 3/2),
       not (min-device-pixel-ratio: 1.5),
       not (min-resolution: 1.25dppx) // NOT RETINA WITH 125% ZOOM
```

#### [demo all media](https://www.ryadel.com/en/css3-media-query-target-only-ie-ie6-ie11-firefox-chrome-safari-edge/)

#### [gulp-pugbem](https://ru.bem.info/forum/1426/)

```
header.header
    nav.menu
        a(href="#")._logo Company
        .list
            a._item.-active(href="#") Home
            a._item(href="#") News
            a._item(href="#") Gallery
            a._item(href="#") Partners
            a._item(href="#") About
            a._item(href="#") Contacts
    h1._title Hello, World!
```

## Twig usage

Documentation of usage as gulp module, you can read [here](https://github.com/simon-dt/gulp-twig).
Documentation of syntax and more options, you can read [here](https://twig.symfony.com/doc/3.x/).

### Global variables

-   `currentPage` - contains a `string` with current page value.
-   `prod` - contains a `bool` with current global development mod.
-   `webpack` - contains a `bool` with current javaScript development mod.

### Also as custom functions in the gulp module you can use:

-   `json(fileName: string)` - return parsed `json` file in folder `src\json\fileName.json`.
-   `auto(fileName: string)` - return parsed `json` file in folder `src\auto\fileName.json`.
-   `toLowerCase(string: string)` - returns a string value converted to lower case.
-   `replace(string: string, regExp: string, newValue: string, RegExpFlags: string[])` - returns a new string with one, some, or all matches of a pattern replaced by a replacement.
