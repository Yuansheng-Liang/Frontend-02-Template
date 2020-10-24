const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
    module: {
        rules: [
            {   
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new copyPlugin({
            patterns: [
                {from: 'src/*.html', to: '[name].[ext]'}
            ]
        })
    ]
}