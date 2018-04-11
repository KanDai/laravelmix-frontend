// import .env / plugin
require('dotenv').config()
const mix = require('laravel-mix')
const glob = require('glob')

// Compile all scss files directly under the sass directory
glob.sync('resources/sass/*.scss').map(function (file) {
  mix.sass(file, 'public/assets/css')
    .options({
      processCssUrls: false,
      postCss: [
        require('css-mqpacker')(),
        require('css-declaration-sorter')({
          order: 'smacss'
        })
      ],
      autoprefixer: {
        options: {
          browsers: [
            'last 2 versions',
          ]
        }
      }
    })
})

// Compile all js files directly under the js directory
glob.sync('resources/js/*.js').map(function (file) {
  mix.js(file, 'public/assets/js')
})

mix
  // Notification off
  .disableNotifications()

  // Setting browserSync
  .browserSync({
    // Using a vhost-based url
    // proxy: process.env.MIX_SENTRY_DSN_PUBLIC || 'http://localhost:8080',
    // Serve files from the public directory
    server: {
      baseDir: 'public',
      index: 'index.html'
    },
    port: 8080,
    proxy: false,
    // Watch files
    files: 'public/**/*'
  })

  // Added webpackConfig settings
  .webpackConfig({
    module: {
      rules: [
        { // JavaScript Prettier Setting
          test: /\.js$/,
          loader: 'prettier-loader',
          options: { // Prettier Options https://prettier.io/docs/en/options.html
            singleQuote: true,
            semi: false
          }
        },
        { // Allow .scss files imported glob
          test: /\.scss/,
          loader: 'import-glob-loader'
        },
        { // Sass Prettier Setting
          test: /\.scss$/,
          loader: 'prettier-loader',
          options: {
            parser: "postcss"
          }
        },
      ]
    }
  })

// Generate sourcemap only for development environment
if (!mix.inProduction()) {
  mix.sourceMaps()
}

