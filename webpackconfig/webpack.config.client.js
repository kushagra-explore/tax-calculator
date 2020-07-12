const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './../public/js/');
const APP_DIR = path.resolve(__dirname, './../application/client');
require('webpack-merge');

const { ReactLoadablePlugin } = require('react-loadable/webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
    entry: {
      mobile: APP_DIR + '/index.js'
      //desktop: APP_DIR + '/index_desktop.js',
    },
    output: {
      filename: '[name]-main-[hash].js',
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
             presets: ['@babel/preset-react', '@babel/preset-env'], // Transpiles JSX and ES6,
             plugins: [
                 '@babel/syntax-dynamic-import',
                 '@babel/plugin-transform-runtime',
                 '@babel/plugin-proposal-class-properties',
                 '@babel/plugin-transform-object-assign',
                 'react-loadable/babel'
             ],
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
       new CleanWebpackPlugin({
           verbose: true,
           beforeEmit : true
       }),
       new ReactLoadablePlugin({
           filename:  path.resolve(__dirname, './../public/js/', 'react-loadable.json'),
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
