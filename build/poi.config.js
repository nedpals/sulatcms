const webpack = require('webpack')

module.exports = (options, req) => ({
    entry: './client/index.js',
    webpack(config) {
      config.plugins.push(new webpack.ProvidePlugin({
        m: 'mithril'
      }))
      return config
    }
})
