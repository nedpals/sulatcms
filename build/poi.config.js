const webpack = require('webpack')
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob-all')
const path = require('path')

module.exports = (options, req) => ({
    entry: './client/index.js',
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
