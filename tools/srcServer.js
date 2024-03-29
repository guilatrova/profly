// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync'
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../webpack.config.dev'

const bundler = webpack(config)

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: ['src/*.html'],

  port: 3000,

  server: {
    baseDir: 'src',

    middleware: [
      historyApiFallback({
        disableDotRule: true,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
      }),

      webpackDevMiddleware(bundler, {
        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: true,

        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,
        quiet: false,
        stats: {
          assets: false,
          chunkModules: false,
          chunks: false,
          colors: true,
          hash: false,
          timings: false,
          version: false,
        },

        // for other settings see
        // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),
    ],
  },

  ui: {
    port: 3001,
  },
})
