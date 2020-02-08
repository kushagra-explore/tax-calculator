webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './public/js/');
const APP_DIR = path.resolve(__dirname, './application/client');

const { ReactLoadablePlugin } = require('react-loadable/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VIEWS_DIR =  path.resolve(__dirname, './views/');
const fs = require("fs");

const clientFileChanges  = [path.join(VIEWS_DIR,'index.ejs'),path.join(BUILD_DIR,'..','app-shell.html')];


let config;
config = {
    entry: {
        mobile: APP_DIR + '/index.js'
    },
    output: {
        filename: 'main.js',
        path: BUILD_DIR,
        publicPath: '/public/js/',
        chunkFilename: '[name].js'
    },
    devtool: "eval-source-map",
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules\/)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['react', 'es2015', 'stage-2'],
                        plugins: [
                            'syntax-dynamic-import',
                            'transform-class-properties',
                            'transform-object-assign',
                            'babel-plugin-syntax-dynamic-import',
                            'react-loadable/babel'
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'raw-loader'
            },
        ],

    },
    plugins: [
        new CleanWebpackPlugin(['js'], {root: path.resolve(__dirname, './public/'), verbose: true, beforeEmit: true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ReactLoadablePlugin({
            filename: path.resolve(__dirname, './public/js/', 'react-loadable.json'),
        }),
    ],
    optimization: {

        splitChunks: {
            minChunks: 1,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]((?!react-helmet|react-google-charts|formsy-react).*)[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                default: false
            },
            minSize: 200000
        }
    },
};

module.exports = config;
