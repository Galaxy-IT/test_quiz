// const principalExtractor = require('@principalstudio/principal-purgecss-extractor');

module.exports = {
  plugins: [
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    }),
    require('autoprefixer'),
    require('postcss-csso'),
    require('postcss-combine-media-query'),
    require('postcss-sort-media-queries'),
    require('postcss-short'),
    require('tailwindcss'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/assets/**/*.{scss,css,styl,stylus,js}', './build/**/*.html'],
      // extractors: [
      //   {
      //     extractor: principalExtractor,
      //     extensions: ['pug']
      //   }
      // ],
      fontFace: true,
      keyframes: true,
      variables: true,
      whitelistPatterns: [/[a-z]+__+[a-z]/],
      whitelistPatternsChildren: [/[a-z]+__+[a-z]/],
      safelist: {
        greedy: [/[a-z]+__+[a-z]/]
      },
      defaultExtractor: (content) => {
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
        const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
        return broadMatches.concat(innerMatches);
      }
    })
  ]
};
