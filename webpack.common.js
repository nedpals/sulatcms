const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader', 'source-map-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: { config: { path: path.resolve(".") } } }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Sulat',
            template: 'index.html'
        }),
        new ProvidePlugin({
            "m": "mithril"
        })
    ],
    resolve: {
        modules: ["src", "node_modules"],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    output: {
        library: 'sulat',
        libraryTarget: 'umd',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this'
    }
};