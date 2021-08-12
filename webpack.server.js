const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        server: ['./server.ts']
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/server/'),
        clean: true,
    },
};