const webpack = require('webpack')
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob-all')
const path = require('path')

let appEntries = ['./client/index.js']

if (process.env.NODE_ENV === "development") {
  appEntries.push('./client/dev.js')
}

module.exports = (options, req) => ({
    format: 'umd',
    moduleName: 'sulatcms',
    entry: appEntries,
    library: process.env.NODE_ENV === "production" ? 'sulatcms': undefined,
    transformModules: ['netlify-auth-providers'],
    presets: [
      require("poi-preset-bundle-report"),
      require('poi-preset-babel-minify')(),
      require('poi-preset-webpackmonitor')({
        launch: true,
        port: 3001
      })
    ],
    webpack(config) {
      config.node = {
        fs: 'empty'
      }
      config.plugins.push(new webpack.ProvidePlugin({
        m: 'mithril'
      }))
      config.plugins.push(new PurifyCSSPlugin({
        paths: glob.sync([
          path.join(__dirname, './index.html'),
          path.join(__dirname, './../client/**/*.js')
        ]),
        minimize: true
      }))
      return config
    }
})
