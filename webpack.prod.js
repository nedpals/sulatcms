const merge = require('webpack-merge');
const common = require('./webpack.common');
const { optimize: { ModuleConcatenationPlugin } } = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    entry: {
        'sulat': './src/sulat.ts',
        'custom-api': './src/plugins/custom-api.ts'
    },
    mode: 'production',
    plugins: [
        new ModuleConcatenationPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            openAnalyzer: true
        })
    ],
    optimization: {
        minimize: true
    }
});