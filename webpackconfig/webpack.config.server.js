require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './../dist');
const APP_DIR = path.resolve(__dirname, './../application/server');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
       new CleanWebpackPlugin({ verbose: true })
  ]
};

module.exports = config;
//  externals: nodeExternals(),
