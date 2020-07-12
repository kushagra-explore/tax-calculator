
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './application/server');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const config = {
   entry: {
     server: APP_DIR + '/index.js',     
   },
   output: {
     filename: '[name].bundle.dev.js',
     path: BUILD_DIR,
     chunkFilename: '[name].js'
   },
   mode : 'development',
   target : 'async-node',
   externals: [nodeExternals()],
   resolve: {
        modules: ['node_modules', 'application'],
        extensions: ['*', '.js', '.json']
    },
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
        sourceMap: false,
        importLoaders: 1
      }
    },
      ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'raw-loader'
      },
     {
       test : /.ejs$/,
       loader : 'raw-loader'

     }
    ],

  },
 
   /* resolve: {
    alias: {
      'react-loadable': path.resolve(__dirname, './Loadable/loadable.js'),
    },
  },*/
   plugins: [
       new CleanWebpackPlugin({
           verbose: true,
           beforeEmit : true
       }),
       new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('development')
       }),
  ]
};

module.exports = config;
//  
