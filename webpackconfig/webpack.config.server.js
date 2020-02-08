/**
 * webpack.config.server.js
 *
 * (C) 2017 mobile.de GmbH
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 09 Feb 2017
 */

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './../dist');
var APP_DIR = path.resolve(__dirname, './../application/server');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
   entry: {
     server: APP_DIR + '/index.js',
   },
   output: {
     filename: '[name].bundle.dev.js',
     path: BUILD_DIR,
     publicPath : '/js/',
     chunkFilename: '[name].[chunkhash].js'
   },
   target : 'node',
   resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json']
    },
   module: {
    rules: [
     {
       test: /\.(jsx|js)?$/,
       exclude: /(node_modules\/)/,
       use: {
         loader: "babel-loader",
         options: {
           presets: ['react', 'es2015','stage-2'], // Transpiles JSX and ES6,
            plugins: [
              'syntax-dynamic-import',
              'transform-class-properties',
              'transform-object-assign',
              'react-loadable/babel'
            ],
         }
       }
     },
       {
        test: /\.css/,
         use: [{
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[local]',//[name]_____[hash:base64:5]
        sourceMap: true,
        importLoaders: 1
      }
    },
      ]
      },
     {
       test : /.ejs$/,
       loader : 'raw-loader'

     }
    ],
  },
  optimization:{
        minimize: false, // <---- disables uglify.
   },
   plugins: [

  ]
};

module.exports = config;
//  externals: nodeExternals(),
