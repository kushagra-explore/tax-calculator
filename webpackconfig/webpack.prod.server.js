const webpack = require('webpack');
const merge = require('webpack-merge');
const serverConfig =  require('./webpack.config.server');

serverWebpack = merge(serverConfig,{
    mode : 'production',
    plugins : [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
});

module.exports = serverWebpack;