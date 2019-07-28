const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    entry: './src/sulat.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
});