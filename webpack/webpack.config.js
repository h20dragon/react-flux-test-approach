var webpack = require('webpack');
var config = require("config") || {};
var ENV = process.env.NODE_ENV;
var IS_DEV = (ENV === "development");
var debug = require('debug')('nui:webpack:config');
var path = require("path");
var node_modules_dir = path.resolve( __dirname, '../node_modules' );
var fs = require("fs");

var _ = {
    "omit": require("lodash/object/omit"),
    "keys": require("lodash/object/keys")
};

//http://webpack.github.io/analyse/

module.exports = function(projectPath, entries) {
    var LocalizePlugin = require(projectPath + '/build/cnqr_modules/concur-localize/webpack-plugin');
    var publicPath = (!!config.ports.webpackDevServer && config.ports.webpackDevServer !== '') ?
        'http://' + config.domain + ':' + config.ports.webpackDevServer + config.cachePath.js : config.cachePath.js
        ;

    //Put all vendors js in one bundle and cache it
    if(!entries || typeof entries !== "object"){ entries = {};}

    // Which that fluxible and fluxible-plugin-fetchr come with a dist folder
    // so we wont have to process them everytime
    entries.vendors = [ "fluxible", "fluxible-plugin-fetchr" ];

    var webpackConfig = {
        entry: entries,
        //config: config,
        resolve: {
            extensions: ['', '.js'],
            alias: {}
        },
        output: {
            publicPath: publicPath,
            path: projectPath + '/public/build/jscache/unminified',
            filename: '[name]-[chunkhash].js'
        },
        module: {
            noParse: []
        },
        addVendor: function (name, path) {
            //Create an alias that points to the minified version
            this.resolve.alias[name] = path;

            //Block webpack from parsing it
            this.module.noParse.push(new RegExp( name ));
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                filename: "common-[chunkhash].js",
                chunks: _.keys(_.omit(entries, 'vendors'))
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: "vendors",
                filename: "vendors-[chunkhash].js",
                chunks: [ "vendors" ]
            }),

            new LocalizePlugin(projectPath + '/build/localization/'),

            // print a webpack progress
            new webpack.ProgressPlugin((percentage, message) => {
                var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
                var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
                process.stdout.write(CLEAR_LINE + "" + Math.round(percentage * 100) + "%:" + message + MOVE_LEFT);
            }),

            new webpack.ProvidePlugin({
                react: "window.React"
            }),

            function() {
                //Build a .json that maps apps to their hashed chunk
                this.plugin("done", function(stats) {
                    var assetsByChunkName = stats.toJson().assetsByChunkName;
                    var assetsPublicPath = {};
                    var assetsFileLocation = {};

                    for(var asset in assetsByChunkName) {
                        if(Array.isArray(assetsByChunkName[asset])){
                            assetsByChunkName[asset] = assetsByChunkName[asset][0];
                        }

                        assetsPublicPath[ asset ] = publicPath + assetsByChunkName[asset];
                        assetsFileLocation[ asset ] = projectPath + '/public/build/jscache/unminified/' + assetsByChunkName[asset];
                    }

                    fs.writeFileSync(
                        path.resolve(__dirname, '../build/config/assets.public.path.json'),
                        JSON.stringify(assetsPublicPath))
                    ;

                    fs.writeFileSync(
                        path.resolve(__dirname, '../build/config/assets.location.json'),
                        JSON.stringify(assetsFileLocation))
                    ;
                });
            }
        ]
    };

    //Create a react alias that points to window.React and block webpack from parsing it
    //Note: if fluxbile and fluxible-plugin-fetchr had a minified version, we would have done the same
    webpackConfig.addVendor('react/addons', path.resolve(__dirname, "./reactExporter.js"));
    webpackConfig.addVendor('react', path.resolve(__dirname, "./reactExporter.js"));

    return webpackConfig;
};
