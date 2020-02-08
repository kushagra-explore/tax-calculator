var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './../public/js_temp/');
var APP_DIR = path.resolve(__dirname, './../application/client');
const merge = require('webpack-merge');

const { ReactLoadablePlugin } = require('react-loadable/webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    entry: {
      mobile: APP_DIR + '/index.js',
      desktop: APP_DIR + '/index_desktop.js',
    },
    output: {
      filename: '[name]-shiksha-main-[hash].js',
      path: BUILD_DIR,
      publicPath : '/pwa/public/js/',
      chunkFilename: '[name].[chunkhash].js'
    },
    stats: {
             colors: true,
             modules: true,
             reasons: true,
             errorDetails: true
           },
    module: {
    rules: [
     {
       test: /\.(jsx|js)?$/,
       exclude: /(node_modules\/)/,
       use: {
         loader: "babel-loader",
         options: {
           presets: ['react', 'es2015','stage-2'], // Transpiles JSX and ES6
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
          test: /\.(css)?$/,
          use: [
           MiniCssExtractPlugin.loader,
          'css-loader',
        ],

     },

    ],

  },
   plugins: [
    new CleanWebpackPlugin(['js_temp'], { root: path.resolve(__dirname , './../public/'), verbose: true , beforeEmit : true}),
    new ReactLoadablePlugin({
      filename:  path.resolve(__dirname, './../public/js_temp/', 'react-loadable.json'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
    }),
    new webpack.ProvidePlugin({
         // lodash
         '_': 'lodash'
     }),
  ]
};

module.exports = config;
