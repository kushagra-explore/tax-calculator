const webpack = require('webpack');
const merge = require('webpack-merge');
const clientConfig =  require('./webpack.config.client');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const fs = require("fs");
const path = require('path');
const VIEWS_DIR =  path.resolve(__dirname, './../views/');
const BUILD_DIR = path.resolve(__dirname, './../public/js/');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const CompressionPlugin = require("compression-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

//const getCSSWithVersion = require('./../application/server/nodeHelper.js').getCSSWithVersion;

//const shikshaCommonCssFile = getCSSWithVersion('shikshaCommon');
//const shikshaDesktopCommonCssFile = getCSSWithVersion('shikshaDesktopCommon');


const clientFileChanges_mobile = [path.join(VIEWS_DIR,'index.ejs'),path.join(BUILD_DIR,'..','app-shell.html')];
//const clientFileChanges_desktop = [path.join(VIEWS_DIR,'index_desktop_temp.ejs'),path.join(BUILD_DIR,'..','desktop-app-shell.html')];

clientConfig.output.filename = '[name]-main-[hash].js';

clientWebpack = merge(clientConfig, {
    mode : 'production',
    plugins : [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin(),
        /*new CompressionPlugin(),*/
        function() {
            this.plugin("done", function(statsData) {
                const stats = statsData.toJson();
                if (!stats.errors.length) {
                    clientFileChanges_mobile.forEach(function(index){
                        //const htmlFileName = "app-shell.html";
                        let html = fs.readFileSync(index, "utf8");
                        let clientBundleHash = stats.assetsByChunkName.mobile;
                        if(Array.isArray(stats.assetsByChunkName.mobile)) {
                            clientBundleHash  = stats.assetsByChunkName.mobile.filter(bundle => bundle.endsWith('js'));
                        }
                        let htmlOutput = html.replace(
                            /mobileMain = (["'])(.+?)mobile-main(.*)\.js\1/i,
                            "mobileMain = $1$2" + clientBundleHash + "$1" );
                        clientBundleHash = stats.assetsByChunkName.vendors;
                        if(Array.isArray(stats.assetsByChunkName.vendors)) {
                            clientBundleHash  = stats.assetsByChunkName.vendors.filter(bundle => bundle.endsWith('js'));
                        }
                        htmlOutput = htmlOutput.replace(
                        /vendorMain = (["'])(.+?)vendors(.*)\.js\1/i,
                        "vendorMain = $1$2" + clientBundleHash + "$1");
                        fs.writeFileSync(
                            index,
                            htmlOutput);
                    });

                }
            });
        },
        //      new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    zindex: false,
                    reduceIdents: false
                }
            })
        ],
        /* splitChunks: {
          cacheGroups: {
            default: false,//disable default 'commons' chunk behavior
            vendors: false, //disable vendor splitting(not sure if you want it)
          }
        }*/
        splitChunks: {
            minChunks : 1,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]((?!react-helmet|react-google-charts|formsy-react).*)[\\/]/,
                    //test: /[\\/]node_modules[\\/]react[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                default : false
            },
            minSize : 200000
        }
    }
});



module.exports = clientWebpack;
