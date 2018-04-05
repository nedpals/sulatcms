const webpack = require('webpack')
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob-all')
const path = require('path')

module.exports = (options, req) => ({
    moduleName: 'sulat',
    format: 'umd',
    entry: './client/index.js',
    library: process.env.NODE_ENV === "production" ? 'sulat-cms': undefined,
    transformModules: ['netlify-auth-providers', 'pluggable.js'],
    webpack(config) {
      config.plugins.push(new webpack.ProvidePlugin({
        m: 'mithril'
      }))
      config.plugins.push(new PurifyCSSPlugin({
        paths: glob.sync([
          path.join(__dirname, './index.html'),
          path.join(__dirname, './../client/**/*.js')
        ])
      }))
      return config
    }
})
