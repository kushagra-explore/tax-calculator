webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './public/js/');
const APP_DIR = path.resolve(__dirname, './application/client');

const { ReactLoadablePlugin } = require('react-loadable/webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VIEWS_DIR =  path.resolve(__dirname, './views/');
const fs = require("fs");
const devMode = process.env.NODE_ENV !== 'production';

const clientFileChanges_mobile  = [path.join(VIEWS_DIR,'index.ejs'),path.join(BUILD_DIR,'..','app-shell.html')];
//const clientFileChanges_desktop = [path.join(VIEWS_DIR,'index_desktop.ejs'),path.join(BUILD_DIR,'..','desktop-app-shell.html')];


let config;
config = {
    entry: {
        mobile: APP_DIR + '/index.js'
    },
    output: {
        filename: '[name]-main.js',
        path: BUILD_DIR,
        publicPath: '/public/js/',
        chunkFilename: '[name].js'
    },
    devtool : "eval-source-map",
    mode : 'development',
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules\/|public\/js\/)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'], // Transpiles JSX and ES6,
                        plugins: [
                            '@babel/syntax-dynamic-import',
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-object-assign',
                            'react-loadable/babel'
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(css)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],

            },
        ],

    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            beforeEmit : true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ReactLoadablePlugin({
            filename: path.resolve(__dirname, './public/js/', 'react-loadable.json'),
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
        }),

    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            minChunks : 2,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]((?!react-helmet|react-google-charts|formsy-react).*)[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                default : false
            },
            minSize : 200000
        }
    },
};

module.exports = config;
