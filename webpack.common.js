const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/index.tsx'],
        vendor: ['react', 'react-dom']
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        /*fallback: { 
            "path": require.resolve("path-browserify"),
            "constants": require.resolve("constants-browserify"),
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
            "stream": require.resolve("stream-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "zlib": require.resolve("browserify-zlib"),
            "fs": false,
            "net": false,
            "tls": false,
            "child_process": false,
            "readline": false
        }*/
    },
    plugins: [
    new HtmlWebpackPlugin({
        template: "./public/index.html"
    }),
    new webpack.ProvidePlugin({
        join: ['lodash', 'join'],
    }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/client/'),
        clean: true,
    },
};