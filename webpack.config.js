const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const webpack = require('webpack');
const ProvidePlugin = require('./gulp/require');
const path = require('path');

const jsUse = production => {
  if (production) {
    return [
      {
        loader: WebpackObfuscator.loader,
        options: {
          rotateStringArray: true,
          rotateUnicodeArray: true
        }
      },
      { loader: 'babel-loader' }
    ]
  }
  return [
    { loader: 'babel-loader' }
  ]
}

module.exports = (production = false) => {
  return {
    mode: production ? 'production' : 'development',
    output: {
      filename: '[name].min.js'
    },
    optimization: {
      minimize: production,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: !production
            }
          },
          extractComments: production,
          parallel: true
        })
      ],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: [
            path.resolve(__dirname, 'excluded_file_name.js'),
            '/(node_modules|bower_components)/'
          ],
          enforce: 'post',
          use: jsUse(production)
        },
        {
          test: /\.(pug)$/,
          use: [
            { loader: "pug-bem-plain-loader" },
            { loader: "raw-loader" }
          ]
        },
        {
          test: /\.styl$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { publicPath: '/dist' } },
            { loader: "css-loader" },
            { loader: "stylus-loader" }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { publicPath: '/dist' } },
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "postcss-loader" }
          ],
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin(ProvidePlugin),
      new CircularDependencyPlugin(),
      new DuplicatePackageCheckerPlugin()
    ]
  }
}
